import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// SECTION DATA
// ============================================================================
const heroContent = {
  headline: 'WE ENGINEER',
  subheadline: 'REALITY',
  tagline: 'Turning ambitious ideas into production-grade software',
};

const statsContent = [
  { value: '150+', label: 'Projects Shipped', detail: 'Across 12 countries' },
  { value: '50+', label: 'Senior Engineers', detail: 'Ex-FAANG talent' },
  { value: '$2B+', label: 'Client Revenue', detail: 'Generated annually' },
  { value: '98%', label: 'Client Retention', detail: 'Year over year' },
];

const servicesContent = [
  {
    id: 'product',
    title: 'Product Development',
    headline: 'From Zero to Scale',
    description: 'We build products that users love and businesses depend on. From MVP to enterprise scale, we handle the full lifecycle.',
    longDesc: 'Whether you\'re a startup launching your first product or an enterprise modernizing legacy systems, we bring the engineering muscle to ship fast and scale confidently.',
    features: [
      { name: 'Full-Stack Engineering', desc: 'React, Node, Python, Go' },
      { name: 'System Architecture', desc: 'Microservices, Event-driven' },
      { name: 'API Design', desc: 'REST, GraphQL, gRPC' },
      { name: 'Database Optimization', desc: 'SQL, NoSQL, Time-series' },
    ],
    stats: [
      { value: '3x', label: 'Faster to Market' },
      { value: '60%', label: 'Cost Reduction' },
    ],
    color: '#00FF9D',
    icon: 'rocket',
  },
  {
    id: 'ai',
    title: 'AI Integration',
    headline: 'Intelligence Built In',
    description: 'Harness the power of AI to automate workflows, enhance user experiences, and unlock hidden insights in your data.',
    longDesc: 'From conversational interfaces to predictive analytics, we integrate cutting-edge AI that delivers real business value—not just hype.',
    features: [
      { name: 'LLM Integration', desc: 'OpenAI, Anthropic, Custom' },
      { name: 'Custom ML Models', desc: 'TensorFlow, PyTorch' },
      { name: 'RAG Systems', desc: 'Vector DBs, Embeddings' },
      { name: 'Computer Vision', desc: 'Detection, Segmentation' },
    ],
    stats: [
      { value: '10M+', label: 'Daily Predictions' },
      { value: '40%', label: 'Automation Rate' },
    ],
    color: '#6366F1',
    icon: 'brain',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    headline: 'Scale Without Limits',
    description: 'Infrastructure that scales automatically, costs less, and never goes down. 99.99% uptime guaranteed.',
    longDesc: 'We architect cloud-native systems that handle traffic spikes gracefully, deploy continuously, and give you complete visibility into your operations.',
    features: [
      { name: 'Multi-Cloud', desc: 'AWS, GCP, Azure' },
      { name: 'Container Orchestration', desc: 'Kubernetes, ECS' },
      { name: 'CI/CD Pipelines', desc: 'GitHub Actions, ArgoCD' },
      { name: 'Observability', desc: 'Datadog, Grafana, PagerDuty' },
    ],
    stats: [
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '70%', label: 'Infra Cost Savings' },
    ],
    color: '#BF00FF',
    icon: 'cloud',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    headline: 'Native Experience',
    description: 'Cross-platform or native—apps that feel at home on every device and delight users at every tap.',
    longDesc: 'We craft mobile experiences that users actually want to use. Smooth animations, offline support, push notifications, and deep platform integration.',
    features: [
      { name: 'React Native', desc: 'Cross-platform, fast iteration' },
      { name: 'Flutter', desc: 'Beautiful, performant' },
      { name: 'iOS Native', desc: 'Swift, SwiftUI' },
      { name: 'Android Native', desc: 'Kotlin, Jetpack Compose' },
    ],
    stats: [
      { value: '4.8★', label: 'Avg App Rating' },
      { value: '50%', label: 'Faster Development' },
    ],
    color: '#FF9900',
    icon: 'phone',
  },
];

// Service icons as SVG components
const ServiceIcon = ({ type, color }: { type: string; color: string }) => {
  const iconStyle = { stroke: color, strokeWidth: 1.5, fill: 'none' };
  
  switch (type) {
    case 'rocket':
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" {...iconStyle}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case 'brain':
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" {...iconStyle}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" {...iconStyle}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full" {...iconStyle}>
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    default:
      return null;
  }
};

const techStackContent = {
  frontend: ['React', 'Next.js', 'Vue', 'Astro', 'TypeScript', 'Three.js'],
  backend: ['Node.js', 'Python', 'Go', 'Rust', 'GraphQL', 'gRPC'],
  data: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Kafka', 'Snowflake'],
  ai: ['OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'Pinecone', 'Hugging Face'],
  cloud: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'Datadog'],
};

const caseStudiesContent = [
  {
    title: 'Nexus AI',
    category: 'Machine Learning',
    metric: '10M+',
    metricLabel: 'Daily Predictions',
    color: '#00FF9D',
  },
  {
    title: 'Velocity',
    category: 'FinTech',
    metric: '$2B+',
    metricLabel: 'Monthly Volume',
    color: '#6366F1',
  },
  {
    title: 'HealthBridge',
    category: 'Healthcare',
    metric: '50K+',
    metricLabel: 'Monthly Patients',
    color: '#BF00FF',
  },
];

const teamContent = [
  { name: 'Alex Chen', role: 'Founder & CEO', company: 'Ex-Google', color: '#00FF9D' },
  { name: 'Sarah Martinez', role: 'CTO', company: 'Ex-Meta', color: '#6366F1' },
  { name: 'James Kim', role: 'VP Engineering', company: 'Ex-Stripe', color: '#BF00FF' },
  { name: 'Emily Zhang', role: 'Head of Design', company: 'Ex-Airbnb', color: '#FF9900' },
  { name: 'Marcus Johnson', role: 'Principal Engineer', company: 'Ex-Netflix', color: '#E10098' },
  { name: 'Priya Patel', role: 'AI/ML Lead', company: 'Ex-OpenAI', color: '#00ADD8' },
];

const processContent = [
  { step: '01', title: 'Discovery', desc: 'Deep dive into your business, users, and goals' },
  { step: '02', title: 'Strategy', desc: 'Technical roadmap aligned with business objectives' },
  { step: '03', title: 'Design', desc: 'Intuitive interfaces and robust architectures' },
  { step: '04', title: 'Build', desc: 'Agile sprints with weekly demos' },
  { step: '05', title: 'Launch', desc: 'Production deployment with monitoring' },
  { step: '06', title: 'Scale', desc: 'Ongoing optimization and growth' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AppleStyleScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const ctx = gsap.context(() => {
      // Overall scroll progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setScrollProgress(self.progress),
      });
      
      // Hero parallax
      gsap.to('.hero-headline', {
        yPercent: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      
      // Stats reveal
      gsap.fromTo('.stat-item', 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
      
      // Service cards scale in
      gsap.utils.toArray('.service-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { scale: 0.8, opacity: 0, y: 100 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
      
      // Tech stack horizontal scroll
      gsap.to('.tech-track', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.tech-section',
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      });
      
      // Case studies parallax
      gsap.utils.toArray('.case-study-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { y: 150, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
      
      // Team reveal
      gsap.fromTo('.team-member',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
      
      // Process timeline
      gsap.utils.toArray('.process-step').forEach((step: any, i) => {
        gsap.fromTo(step,
          { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
      
      // CTA scale
      gsap.fromTo('.cta-section',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className="bg-obsidian text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-gradient-to-r from-cyber-lime via-electric-indigo to-electric-purple transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      {/* ========== HERO SECTION ========== */}
      <section className="hero-section min-h-[200vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 grid-lines opacity-20" />
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-lime/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-indigo/20 rounded-full blur-[128px]" />
          
          {/* Content */}
          <div className="hero-headline relative z-10 text-center px-4">
            <h1 className="text-[clamp(3rem,15vw,12rem)] font-display font-black leading-[0.85] tracking-tighter">
              <span className="block text-white/90">{heroContent.headline}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-lime via-electric-indigo to-electric-purple">
                {heroContent.subheadline}
              </span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-white/60 max-w-2xl mx-auto">
              {heroContent.tagline}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact" className="px-8 py-4 bg-white text-obsidian font-bold rounded-full hover:bg-cyber-lime transition-colors">
                Start a Project
              </a>
              <a href="/work" className="px-8 py-4 border border-white/30 rounded-full hover:border-white transition-colors">
                View Our Work
              </a>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
            <span className="text-sm font-mono">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border border-white/30 flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>
      
      {/* ========== STATS SECTION ========== */}
      <section className="stats-section py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {statsContent.map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <div className="text-5xl md:text-7xl font-mono font-bold text-cyber-lime">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-medium text-white">{stat.label}</div>
                <div className="text-sm text-white/50">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ========== SERVICES SECTION - APPLE STYLE ========== */}
      <section className="services-section">
        {/* Section Header */}
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="text-center px-4">
            <span className="text-sm font-mono uppercase tracking-widest text-cyber-lime">What We Do</span>
            <h2 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-display font-bold">
              Full-Stack
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-lime via-electric-indigo to-electric-purple">
                Expertise
              </span>
            </h2>
            <p className="mt-8 text-xl text-white/60 max-w-2xl mx-auto">
              From initial concept to global scale, we provide end-to-end engineering services that transform ideas into industry-leading products.
            </p>
            <div className="mt-12 flex flex-col items-center gap-2 text-white/40">
              <span className="text-sm font-mono">Scroll to explore</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Individual Service Sections */}
        {servicesContent.map((service, i) => (
          <div 
            key={service.id}
            className="service-card min-h-screen relative"
            style={{ background: `linear-gradient(180deg, ${service.color}08 0%, transparent 50%)` }}
          >
            {/* Background Large Number */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-display font-black opacity-[0.03] pointer-events-none select-none"
              style={{ color: service.color }}
            >
              0{i + 1}
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
                {/* Visual Side */}
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* Icon Container */}
                  <div className="relative aspect-square max-w-lg mx-auto">
                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-full blur-[100px] opacity-30"
                      style={{ backgroundColor: service.color }}
                    />
                    
                    {/* Main Icon */}
                    <div 
                      className="relative w-full h-full rounded-3xl border p-16 flex items-center justify-center"
                      style={{ 
                        borderColor: `${service.color}30`,
                        background: `linear-gradient(135deg, ${service.color}10, transparent)`,
                      }}
                    >
                      <div className="w-48 h-48">
                        <ServiceIcon type={service.icon} color={service.color} />
                      </div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute -bottom-4 -right-4 flex gap-3">
                      {service.stats.map((stat, j) => (
                        <div 
                          key={j}
                          className="px-4 py-3 rounded-xl border backdrop-blur-sm"
                          style={{ 
                            borderColor: `${service.color}40`,
                            backgroundColor: 'rgba(5, 5, 5, 0.8)',
                          }}
                        >
                          <div 
                            className="text-2xl font-mono font-bold"
                            style={{ color: service.color }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/50">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Service Number & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <span 
                      className="text-6xl font-mono font-bold opacity-20"
                      style={{ color: service.color }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <span 
                        className="text-sm font-mono uppercase tracking-widest"
                        style={{ color: service.color }}
                      >
                        {service.title}
                      </span>
                    </div>
                  </div>
                  
                  {/* Headline */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                    {service.headline}
                  </h3>
                  
                  {/* Description */}
                  <p className="mt-6 text-xl text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="mt-4 text-lg text-white/40 leading-relaxed">
                    {service.longDesc}
                  </p>
                  
                  {/* Features Grid */}
                  <div className="mt-10 grid grid-cols-2 gap-4">
                    {service.features.map((feature, j) => (
                      <div 
                        key={j}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
                      >
                        <h4 className="font-semibold text-white group-hover:text-cyber-lime transition-colors">
                          {feature.name}
                        </h4>
                        <p className="text-sm text-white/50 mt-1">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="mt-10 flex items-center gap-6">
                    <a 
                      href="/services"
                      className="px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                      style={{ backgroundColor: service.color, color: '#050505' }}
                    >
                      Learn More
                    </a>
                    <a 
                      href="/contact"
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium"
                    >
                      Start a Project
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            {i < servicesContent.length - 1 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            )}
          </div>
        ))}
      </section>
      
      {/* ========== TECH STACK HORIZONTAL SCROLL ========== */}
      <section className="tech-section h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-carbon to-obsidian" />
        
        <div className="tech-track absolute inset-0 flex items-center" style={{ width: '300vw' }}>
          {/* Intro */}
          <div className="w-screen h-full flex items-center justify-center px-8">
            <div className="text-center">
              <span className="text-sm font-mono uppercase tracking-widest text-electric-purple">Our Arsenal</span>
              <h2 className="mt-4 text-4xl md:text-7xl font-display font-bold">
                Modern Tech Stack
              </h2>
              <p className="mt-6 text-xl text-white/60 max-w-lg mx-auto">
                We choose the best tools for your specific needs
              </p>
              <div className="mt-8 text-sm text-white/40 font-mono">
                ← Scroll horizontally →
              </div>
            </div>
          </div>
          
          {/* Tech Categories */}
          <div className="w-screen h-full flex items-center px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl mx-auto">
              {Object.entries(techStackContent).map(([category, techs], i) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-white/40 mb-4">
                    {category}
                  </h3>
                  {techs.map((tech, j) => (
                    <div 
                      key={tech}
                      className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-center font-medium hover:border-cyber-lime/50 hover:bg-cyber-lime/5 transition-all cursor-default"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="w-screen h-full flex items-center justify-center px-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-5xl font-display font-bold">
                Stack Agnostic
              </h3>
              <p className="mt-4 text-xl text-white/60 max-w-lg mx-auto">
                We adapt to your existing infrastructure or build from scratch
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ========== CASE STUDIES SECTION ========== */}
      <section className="case-studies-section py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-mono uppercase tracking-widest text-warning-yellow">Featured Work</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold">
              Real Results
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudiesContent.map((study, i) => (
              <a 
                key={i}
                href={`/work/${study.title.toLowerCase().replace(' ', '-')}`}
                className="case-study-card group block"
              >
                <div 
                  className="aspect-[4/5] rounded-3xl relative overflow-hidden border border-white/10 group-hover:border-white/30 transition-all"
                  style={{ background: `linear-gradient(180deg, ${study.color}15, transparent)` }}
                >
                  <div className="absolute inset-0 grid-lines opacity-20" />
                  
                  {/* Metric */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div 
                      className="text-6xl md:text-8xl font-mono font-black"
                      style={{ color: study.color }}
                    >
                      {study.metric}
                    </div>
                    <div className="text-white/60 mt-2">{study.metricLabel}</div>
                  </div>
                  
                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidian/80 to-transparent">
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: study.color }}>
                      {study.category}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white mt-1">
                      {study.title}
                    </h3>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-6 py-3 rounded-full bg-white text-obsidian font-bold">
                      View Case Study
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a 
              href="/work"
              className="inline-flex items-center gap-2 text-lg font-medium text-cyber-lime hover:text-white transition-colors"
            >
              View All Projects
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* ========== TEAM SECTION ========== */}
      <section className="team-section py-32 bg-gradient-to-b from-obsidian via-carbon to-obsidian">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-mono uppercase tracking-widest text-electric-indigo">The Team</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold">
              Senior Practitioners
            </h2>
            <p className="mt-4 text-xl text-white/60 max-w-2xl mx-auto">
              Engineers from the world's most innovative companies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamContent.map((member, i) => (
              <div key={i} className="team-member text-center group">
                <div 
                  className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-bold border-2 transition-all group-hover:scale-110"
                  style={{ 
                    borderColor: member.color,
                    backgroundColor: `${member.color}10`,
                    color: member.color,
                  }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="mt-4 font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-white/60">{member.role}</p>
                <p className="text-xs text-white/40">{member.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ========== PROCESS SECTION ========== */}
      <section className="process-section py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-sm font-mono uppercase tracking-widest text-hot-pink">How We Work</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold">
              Our Process
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />
            
            <div className="space-y-16">
              {processContent.map((item, i) => (
                <div 
                  key={i}
                  className={`process-step flex items-center gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <span className="text-6xl font-mono font-bold text-white/10">{item.step}</span>
                    <h3 className="text-2xl font-display font-bold text-white -mt-4">{item.title}</h3>
                    <p className="mt-2 text-white/60">{item.desc}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-cyber-lime hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* ========== CTA SECTION ========== */}
      <section className="cta-section py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-7xl font-display font-bold leading-tight">
            Ready to build
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-lime to-electric-indigo">
              something great?
            </span>
          </h2>
          <p className="mt-8 text-xl text-white/60 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help turn your vision into reality.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/contact" 
              className="px-10 py-5 bg-cyber-lime text-obsidian font-bold text-lg rounded-full hover:bg-white transition-colors"
            >
              Start a Conversation
            </a>
            <a 
              href="/services" 
              className="px-10 py-5 border border-white/30 text-lg rounded-full hover:border-white transition-colors"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>
      
      {/* ========== FOOTER ========== */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-2xl font-display font-bold">
              <span className="text-cyber-lime">APEX</span> LABS
            </div>
            <div className="flex items-center gap-8 text-sm text-white/60">
              <a href="/work" className="hover:text-white transition-colors">Work</a>
              <a href="/services" className="hover:text-white transition-colors">Services</a>
              <a href="/about" className="hover:text-white transition-colors">About</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm text-white/40">
              © 2024 Apex Labs. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
