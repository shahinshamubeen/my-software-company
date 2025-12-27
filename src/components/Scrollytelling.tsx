import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Slide {
  title: string;
  description: string;
  mockupState: 'wireframe' | 'design' | 'code' | 'live';
}

interface ScrollytellingProps {
  projectName: string;
  projectColor: string;
  slides: Slide[];
}

// Device mockup states
const mockupVisuals: Record<string, { bg: string; content: string; label: string }> = {
  wireframe: {
    bg: 'from-slate-800 to-slate-900',
    content: 'grid-lines',
    label: 'Wireframes',
  },
  design: {
    bg: 'from-indigo-900 to-purple-900',
    content: 'gradient',
    label: 'UI Design',
  },
  code: {
    bg: 'from-green-900 to-emerald-900',
    content: 'code',
    label: 'Development',
  },
  live: {
    bg: 'from-cyan-900 to-blue-900',
    content: 'live',
    label: 'Production',
  },
};

export default function Scrollytelling({ projectName, projectColor, slides }: ScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    if (!containerRef.current || !mockupRef.current || !slidesRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const ctx = gsap.context(() => {
      // Pin the mockup while scrolling through slides
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: mockupRef.current,
        pinSpacing: false,
      });
      
      // Track active slide based on scroll position
      const slideElements = slidesRef.current?.querySelectorAll('.scroll-slide');
      slideElements?.forEach((slide, index) => {
        ScrollTrigger.create({
          trigger: slide,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSlide(index),
          onEnterBack: () => setActiveSlide(index),
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [slides.length]);
  
  const currentMockup = mockupVisuals[slides[activeSlide]?.mockupState || 'wireframe'];
  
  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Pinned Mockup */}
          <div
            ref={mockupRef}
            className="hidden lg:flex items-center justify-center h-screen sticky top-0"
          >
            <div className="relative w-full max-w-md">
              {/* Phone Frame */}
              <div className="relative bg-obsidian rounded-[3rem] p-3 shadow-2xl border-2 border-white/10">
                {/* Screen */}
                <div
                  className={`relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-gradient-to-br ${currentMockup.bg} transition-all duration-700`}
                >
                  {/* Dynamic Screen Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {currentMockup.content === 'grid-lines' && (
                      <div className="absolute inset-0 grid-lines opacity-50">
                        <div className="absolute inset-8 border-2 border-dashed border-white/20 rounded-lg" />
                        <div className="absolute top-12 left-8 right-8 h-8 bg-white/10 rounded" />
                        <div className="absolute top-24 left-8 right-8 h-32 bg-white/5 rounded" />
                        <div className="absolute bottom-20 left-8 right-8 h-12 bg-white/10 rounded" />
                      </div>
                    )}
                    
                    {currentMockup.content === 'gradient' && (
                      <div className="absolute inset-0">
                        <div 
                          className="absolute inset-4 rounded-2xl"
                          style={{ background: `linear-gradient(135deg, ${projectColor}40, ${projectColor}10)` }}
                        />
                        <div className="absolute top-8 left-6 right-6 h-6 bg-white/20 rounded-full" />
                        <div className="absolute top-20 left-6 w-20 h-20 rounded-2xl" style={{ backgroundColor: projectColor }} />
                        <div className="absolute top-20 left-32 right-6 space-y-2">
                          <div className="h-4 bg-white/30 rounded" />
                          <div className="h-4 bg-white/20 rounded w-3/4" />
                        </div>
                      </div>
                    )}
                    
                    {currentMockup.content === 'code' && (
                      <div className="absolute inset-4 font-mono text-xs text-green-400 overflow-hidden">
                        <div className="space-y-1 opacity-80">
                          <p><span className="text-purple-400">const</span> App = () =&gt; {'{'}</p>
                          <p className="pl-4"><span className="text-blue-400">return</span> (</p>
                          <p className="pl-8">&lt;<span className="text-yellow-400">Container</span>&gt;</p>
                          <p className="pl-12">&lt;<span className="text-yellow-400">Hero</span> /&gt;</p>
                          <p className="pl-12">&lt;<span className="text-yellow-400">Features</span> /&gt;</p>
                          <p className="pl-8">&lt;/<span className="text-yellow-400">Container</span>&gt;</p>
                          <p className="pl-4">);</p>
                          <p>{'}'}</p>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 h-px bg-green-400 animate-pulse" />
                      </div>
                    )}
                    
                    {currentMockup.content === 'live' && (
                      <div className="absolute inset-0">
                        <div 
                          className="absolute inset-0"
                          style={{ background: `linear-gradient(180deg, ${projectColor}30, transparent)` }}
                        />
                        <div className="absolute top-6 left-4 right-4 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs text-white/60 font-mono">LIVE</span>
                        </div>
                        <div className="absolute inset-4 top-12 grid grid-cols-2 gap-2">
                          <div className="bg-white/10 rounded-lg" />
                          <div className="bg-white/10 rounded-lg" />
                          <div className="col-span-2 bg-white/5 rounded-lg" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* State Label */}
                  <div 
                    className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{ backgroundColor: projectColor, color: '#050505' }}
                  >
                    {currentMockup.label}
                  </div>
                  
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-obsidian rounded-full" />
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeSlide 
                        ? 'scale-150' 
                        : 'bg-white/20'
                    }`}
                    style={{ 
                      backgroundColor: index === activeSlide ? projectColor : undefined 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Scrolling Content */}
          <div ref={slidesRef} className="py-[50vh]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="scroll-slide min-h-screen flex items-center py-20"
              >
                <div 
                  className={`p-8 rounded-2xl transition-all duration-500 ${
                    index === activeSlide 
                      ? 'glass-card border border-white/20' 
                      : 'opacity-40'
                  }`}
                >
                  <span 
                    className="text-sm font-mono uppercase tracking-wider"
                    style={{ color: projectColor }}
                  >
                    Phase {index + 1}
                  </span>
                  <h3 className="mt-2 text-3xl font-display font-bold text-white">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-lg text-white/60 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  {/* Mobile-only mockup */}
                  <div className="lg:hidden mt-8">
                    <div 
                      className={`aspect-video rounded-xl bg-gradient-to-br ${currentMockup.bg} p-4`}
                    >
                      <div className="text-center text-white/60 text-sm font-mono">
                        {currentMockup.label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
