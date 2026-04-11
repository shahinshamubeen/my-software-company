import { useState } from 'react';
import { motion } from 'framer-motion';

const techStack = [
  {
    id: 'frontend',
    title: 'Lightning-Fast Interfaces',
    tags: ['Speed', 'SEO-Optimized', 'Engaging'],
    features: [
      'Instant-loading websites',
      'Ranks higher on Google Search',
      'Fluid, app-like user experiences'
    ],
    icon: '/icons/react.svg',
    accent: 'bg-cyber-lime',
    textAccent: 'text-cyber-lime',
    borderHover: 'group-hover:border-cyber-lime/50',
    shadowHover: 'group-hover:shadow-[0_0_30px_rgba(0,255,157,0.15)]',
  },
  {
    id: 'backend',
    title: 'Bulletproof Infrastructure',
    tags: ['Secure', 'Reliable', 'Scalable'],
    features: [
      'Never crashes under heavy traffic',
      'Bank-grade secure data protection',
      'Grows effortlessly with your business'
    ],
    icon: '/icons/go.svg',
    accent: 'bg-electric-indigo',
    textAccent: 'text-electric-indigo',
    borderHover: 'group-hover:border-electric-indigo/50',
    shadowHover: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]',
  },
  {
    id: 'ai',
    title: 'Intelligent Automation',
    tags: ['AI-Driven', 'Efficient', '24/7'],
    features: [
      'Automate repetitive daily tasks',
      'Smart, autonomous customer service',
      'Drastically lower operational costs'
    ],
    icon: '/icons/python.svg',
    accent: 'bg-electric-purple',
    textAccent: 'text-electric-purple',
    borderHover: 'group-hover:border-electric-purple/50',
    shadowHover: 'group-hover:shadow-[0_0_30px_rgba(191,0,255,0.15)]',
  }
];

export default function TechStack() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-40 relative bg-obsidian overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30 mix-blend-screen">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-indigo/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-lime/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="section-container relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-electric-purple animate-pulse"></span>
            <span className="text-sm font-mono text-white/80 tracking-wide uppercase">Engineering Foundation</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-display-md md:text-display-lg font-display font-bold text-white mb-6"
          >
            Our Technology Stack
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed"
          >
            We don't rely on dated tech. We use modern engineering to guarantee your products are lightning-fast, perfectly secure, and capable of scaling infinitely.
          </motion.p>
        </div>

        {/* =========================================
            BENTO GRID LAYOUT
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredCard(tech.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                group relative w-full flex flex-col justify-between rounded-2xl bg-black/40 backdrop-blur-xl 
                border border-white/10 p-8 md:p-10 transition-all duration-500 overflow-hidden
                ${tech.borderHover} ${tech.shadowHover}
              `}
            >
              {/* Card internal gradient glow on hover */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${tech.accent}`}
                style={{ mixBlendMode: 'screen', filter: 'blur(40px)' }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/5 rounded-xl blur-md group-hover:bg-white/10 transition-colors"></div>
                    <div className={`relative w-full h-full p-2.5 bg-white/5 border border-white/10 rounded-xl group-hover:border-white/20 transition-all flex items-center justify-center`}>
                      <img 
                        src={tech.icon} 
                        alt={tech.title} 
                        className="w-full h-full object-contain filter drop-shadow-md opacity-80 group-hover:opacity-100 transition-all"
                        style={{ filter: tech.id === 'ai' ? 'invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'none' }}
                      />
                    </div>
                  </div>
                  
                  {/* Decorative dot indicator */}
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/80 transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className="mt-auto">
                  <h3 className="text-xl font-display font-semibold text-white mb-5 group-hover:text-white transition-colors duration-300">
                    {tech.title}
                  </h3>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tech.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 text-xs font-mono tracking-wide rounded border transition-colors duration-300 bg-white/5 border-white/10 text-white/70 group-hover:border-white/20 group-hover:text-white/90 group-hover:shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Visual Checklist */}
                  <ul className="space-y-3">
                    {tech.features.map(feature => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                        <svg 
                          className={`w-5 h-5 flex-shrink-0 ${tech.textAccent} opacity-80 mt-0.5 drop-shadow-md`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Bottom accent line on hover */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out ${tech.accent}`}></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
