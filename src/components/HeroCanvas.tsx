import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

// Reusable vector for vertex manipulation to avoid GC pauses
const tempVertex = new THREE.Vector3();

// ============================================================================
// MORPHING SPHERE - The hero centerpiece with birth animation
// ============================================================================
function MorphingSphere({ isReady }: { isReady: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { pointer } = useThree();

  // Animation state
  const animationProgress = useRef(0);
  const targetScale = useRef(0);
  const currentScale = useRef(0);
  const currentDistortion = useRef(2); // Start with high distortion

  useEffect(() => {
    if (isReady) {
      targetScale.current = 1;
    }
  }, [isReady]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Clamp delta to prevent massive jumps when tab becomes active
    const safeDelta = Math.min(delta, 0.1);
    const time = state.clock.elapsedTime;

    // Smooth scale animation (very gradual emergence)
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale.current,
      safeDelta * 1.5 // Adjusted speed after delta clamp
    );

    // Gradually reduce the "chaos" distortion as it forms
    const targetDistortion = isReady ? 0.5 : 2;
    currentDistortion.current = THREE.MathUtils.lerp(
      currentDistortion.current,
      targetDistortion,
      safeDelta * 2
    );

    meshRef.current.scale.setScalar(currentScale.current);

    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    meshRef.current.rotation.y = time * 0.1;

    // Morph the geometry with animated intensity
    const geometry = meshRef.current.geometry as THREE.IcosahedronGeometry;
    const positionAttribute = geometry.getAttribute("position");

    // Blend between chaotic and calm based on animation progress
    const morphIntensity = 0.3 * (1 + (1 - currentScale.current) * 2);

    for (let i = 0; i < positionAttribute.count; i++) {
      tempVertex.fromBufferAttribute(positionAttribute, i);
      tempVertex.normalize();

      // Noise-based displacement with animated intensity
      const noise =
        Math.sin(tempVertex.x * 3 + time * 0.8) *
        Math.sin(tempVertex.y * 3 + time * 0.6) *
        Math.sin(tempVertex.z * 3 + time * 0.7);

      const displacement =
        2 + noise * morphIntensity + Math.sin(time * 0.5 + i * 0.01) * 0.1;

      tempVertex.multiplyScalar(displacement);
      positionAttribute.setXYZ(i, tempVertex.x, tempVertex.y, tempVertex.z);
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={0}>
        <icosahedronGeometry args={[2, 32]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          samples={16}
          resolution={256}
          transmission={0.95}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.4}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          color="#00FF9D"
          attenuationColor="#6366F1"
          attenuationDistance={0.5}
        />
      </mesh>
    </Float>
  );
}

// ============================================================================
// FLOATING PARTICLES - With explosion animation from center
// ============================================================================
function FloatingParticles({
  count = 200,
  isReady,
}: {
  count?: number;
  isReady: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  // Animation progress
  const expansionProgress = useRef(0);

  // Smoothed mouse position (continues moving even when pointer leaves canvas)
  const smoothedMouse = useRef({ x: 0, y: 0 });

  // Store both initial (clustered) and target (expanded) positions
  const particleData = useMemo(() => {
    const initialPositions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const delays = new Float32Array(count); // Staggered animation delays

    const colorOptions = [
      new THREE.Color("#00FF9D"),
      new THREE.Color("#6366F1"),
      new THREE.Color("#BF00FF"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Initial position: clustered at center with slight randomness
      initialPositions[i3] = (Math.random() - 0.5) * 0.5;
      initialPositions[i3 + 1] = (Math.random() - 0.5) * 0.5;
      initialPositions[i3 + 2] = (Math.random() - 0.5) * 0.5;

      // Target position: distributed in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 8;

      targetPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      targetPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      targetPositions[i3 + 2] = r * Math.cos(phi);

      const color =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Random delay for staggered explosion
      delays[i] = Math.random() * 0.5;
    }

    return { initialPositions, targetPositions, colors, delays };
  }, [count]);

  // Current animated positions
  const currentPositions = useRef(
    new Float32Array(particleData.initialPositions)
  );
  const currentSize = useRef(0); // Start with size 0
  const currentOpacity = useRef(0); // Start with opacity 0
  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const safeDelta = Math.min(delta, 0.1);
    const time = state.clock.elapsedTime;

    // Progress the expansion when ready (very gradual)
    if (isReady && expansionProgress.current < 1) {
      expansionProgress.current = Math.min(
        1,
        expansionProgress.current + safeDelta * 0.25
      ); // Much slower expansion
    }

    // Only start showing particles after a delay and when expansion has begun
    const shouldShow = isReady && expansionProgress.current > 0.1;

    // Animate particle size - start at 0 and grow
    const targetSize = shouldShow ? 0.08 : 0;
    currentSize.current = THREE.MathUtils.lerp(
      currentSize.current,
      targetSize,
      safeDelta * 0.8
    );

    // Animate opacity - start at 0 and fade in
    const targetOpacity = shouldShow ? 0.8 : 0;
    currentOpacity.current = THREE.MathUtils.lerp(
      currentOpacity.current,
      targetOpacity,
      safeDelta * 0.6
    );

    if (materialRef.current) {
      materialRef.current.size = currentSize.current;
      materialRef.current.opacity = currentOpacity.current;
    }

    // Update particle positions with staggered animation
    const positions = pointsRef.current.geometry.getAttribute("position");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const delay = particleData.delays[i];

      // Calculate individual particle progress with delay
      const particleProgress = Math.max(
        0,
        Math.min(
          1,
          (expansionProgress.current - delay * 0.3) / (1 - delay * 0.3) // Gentler stagger
        )
      );

      // Eased progress (ease out exponential - much smoother)
      const eased =
        particleProgress === 1 ? 1 : 1 - Math.pow(2, -10 * particleProgress);

      // Interpolate from initial to target position
      const x = THREE.MathUtils.lerp(
        particleData.initialPositions[i3],
        particleData.targetPositions[i3],
        eased
      );
      const y = THREE.MathUtils.lerp(
        particleData.initialPositions[i3 + 1],
        particleData.targetPositions[i3 + 1],
        eased
      );
      const z = THREE.MathUtils.lerp(
        particleData.initialPositions[i3 + 2],
        particleData.targetPositions[i3 + 2],
        eased
      );

      positions.setXYZ(i, x, y, z);
    }

    positions.needsUpdate = true;

    // Smooth the mouse position (continues moving even when pointer is over text)
    smoothedMouse.current.x = THREE.MathUtils.lerp(
      smoothedMouse.current.x,
      pointer.x,
      safeDelta * 3
    );
    smoothedMouse.current.y = THREE.MathUtils.lerp(
      smoothedMouse.current.y,
      pointer.y,
      safeDelta * 3
    );

    // Gentle rotation with smoothed mouse influence
    pointsRef.current.rotation.y = time * 0.02 + smoothedMouse.current.x * 0.1;
    pointsRef.current.rotation.x = smoothedMouse.current.y * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.initialPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ============================================================================
// ANIMATED SPARKLES - Fade in after main elements
// ============================================================================
function AnimatedSparkles({ isReady }: { isReady: boolean }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (isReady) {
      // Delay sparkles appearance - much later for dramatic effect
      const timer = setTimeout(() => {
        setOpacity(0.5);
      }, 3000); // 3 seconds delay
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  return (
    <Sparkles
      count={100}
      scale={12}
      size={2}
      speed={0.3}
      opacity={opacity}
      color="#00FF9D"
    />
  );
}

// ============================================================================
// LOADING SKELETON
// ============================================================================
function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Animated gradient orb placeholder */}
      <div className="relative">
        {/* Pulsing outer ring */}
        <div
          className="absolute inset-0 -m-8 rounded-full border border-cyber-lime/20 animate-ping"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="absolute inset-0 -m-16 rounded-full border border-electric-indigo/10 animate-ping"
          style={{ animationDuration: "3s", animationDelay: "0.5s" }}
        />

        {/* Main orb */}
        <div
          className="w-32 h-32 rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,157,0.3) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)",
          }}
        />

        {/* Floating dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8">
          <div
            className="w-2 h-2 rounded-full bg-cyber-lime/50 animate-bounce"
            style={{ animationDelay: "0s" }}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8">
          <div
            className="w-2 h-2 rounded-full bg-electric-indigo/50 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8">
          <div
            className="w-2 h-2 rounded-full bg-electric-purple/50 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8">
          <div
            className="w-2 h-2 rounded-full bg-cyber-lime/50 animate-bounce"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
        <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
          Loading Experience
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// SCENE COMPOSITION
// ============================================================================
function Scene() {
  const [isReady, setIsReady] = useState(false);

  // Trigger the birth animation after a brief moment
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500); // Slightly longer initial pause
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={2} color="#00FF9D" />
      <pointLight position={[5, -5, 5]} intensity={2} color="#6366F1" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#BF00FF" />

      {/* Main Morphing Sphere */}
      <MorphingSphere isReady={isReady} />

      {/* Sparkles - delayed entrance */}
      <AnimatedSparkles isReady={isReady} />

      {/* Floating Particles - explode from center */}
      <FloatingParticles count={150} isReady={isReady} />

      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================
export default function HeroCanvas() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-cyber-lime/10 via-transparent to-electric-indigo/10" />
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Loading skeleton shown until canvas is ready */}
      {!isLoaded && <LoadingSkeleton />}

      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: "transparent" }}
        onCreated={() => {
          // Small delay to ensure smooth transition
          setTimeout(() => setIsLoaded(true), 100);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
