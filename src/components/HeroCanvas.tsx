import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shape component
function FloatingShape({
  position,
  rotation,
  scale,
  color,
  speed = 1,
  distort = 0.3,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle rotation
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
    
    // Subtle floating animation based on time
    const time = state.clock.elapsedTime;
    meshRef.current.position.y += Math.sin(time * speed) * 0.001;
  });
  
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Floating cube component
function FloatingCube({
  position,
  scale = 1,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(time * speed * 0.5) * 0.3;
    meshRef.current.rotation.y = time * speed * 0.2;
  });
  
  return (
    <Float speed={speed * 0.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

// Tetrahedron component
function FloatingTetra({
  position,
  scale = 1,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = time * speed * 0.3;
    meshRef.current.rotation.z = Math.sin(time * speed * 0.5) * 0.2;
  });
  
  return (
    <Float speed={speed * 0.7} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

// Mouse-reactive particles
function Particles({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorOptions = [
      new THREE.Color('#00FF9D'), // cyber-lime
      new THREE.Color('#6366F1'), // electric-indigo
      new THREE.Color('#BF00FF'), // electric-purple
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Gentle rotation based on mouse
    meshRef.current.rotation.x = mouse.y * 0.1 + time * 0.02;
    meshRef.current.rotation.y = mouse.x * 0.1 + time * 0.03;
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Scene composition
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#00FF9D" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#6366F1" />
      
      {/* Floating Shapes */}
      <FloatingShape position={[-4, 2, -3]} color="#00FF9D" speed={0.8} scale={1.2} />
      <FloatingShape position={[4, -1, -4]} color="#6366F1" speed={1.2} scale={0.9} distort={0.4} />
      <FloatingShape position={[0, 3, -5]} color="#BF00FF" speed={0.6} scale={0.7} />
      
      <FloatingCube position={[-3, -2, -2]} color="#00FF9D" speed={0.9} scale={0.6} />
      <FloatingCube position={[3, 1, -3]} color="#6366F1" speed={1.1} scale={0.5} />
      
      <FloatingTetra position={[2, -3, -4]} color="#BF00FF" speed={0.7} scale={0.8} />
      <FloatingTetra position={[-2, 0, -6]} color="#00FF9D" speed={1.3} scale={0.6} />
      
      {/* Particles */}
      <Particles count={80} />
    </>
  );
}

// Main component
export default function HeroCanvas() {
  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;
  
  if (prefersReducedMotion) {
    // Return a static gradient for users who prefer reduced motion
    return (
      <div className="w-full h-full bg-gradient-to-br from-cyber-lime/5 via-transparent to-electric-indigo/5" />
    );
  }
  
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]} // Limit DPR for performance
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
