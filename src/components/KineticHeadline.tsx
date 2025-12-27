import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function KineticHeadline() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!headlineRef.current || !line1Ref.current || !line2Ref.current) return;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.fromTo(
        line1Ref.current,
        { 
          opacity: 0, 
          y: 50,
          fontWeight: 300,
        },
        { 
          opacity: 1, 
          y: 0,
          fontWeight: 300,
          duration: 1,
          ease: 'power3.out',
        }
      );
      
      gsap.fromTo(
        line2Ref.current,
        { 
          opacity: 0, 
          y: 50,
          fontWeight: 300,
        },
        { 
          opacity: 1, 
          y: 0,
          fontWeight: 300,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
      
      // Scroll-linked font weight animation
      ScrollTrigger.create({
        trigger: headlineRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Interpolate font weight from 300 to 900
          const weight = Math.round(300 + progress * 600);
          
          if (line1Ref.current) {
            line1Ref.current.style.fontWeight = String(weight);
          }
          if (line2Ref.current) {
            line2Ref.current.style.fontWeight = String(weight);
          }
        },
      });
    }, headlineRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={headlineRef} className="relative">
      <h1 className="text-display-xl font-display tracking-tight">
        <span
          ref={line1Ref}
          className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80"
          style={{ fontWeight: 300 }}
        >
          WE ENGINEER
        </span>
        <span
          ref={line2Ref}
          className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-lime via-electric-indigo to-electric-purple"
          style={{ fontWeight: 300 }}
        >
          REALITY
        </span>
      </h1>
      
      {/* Glitch effect overlay (hidden by default, visible on hover) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-200"
        aria-hidden="true"
      >
        <div className="absolute inset-0 text-display-xl font-display tracking-tight mix-blend-screen">
          <span className="block text-red-500/30 animate-pulse" style={{ transform: 'translate(-2px, 2px)' }}>
            WE ENGINEER
          </span>
          <span className="block text-blue-500/30 animate-pulse" style={{ transform: 'translate(2px, -2px)' }}>
            REALITY
          </span>
        </div>
      </div>
    </div>
  );
}
