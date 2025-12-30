import { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { technologies, categoryLabels, categoryColors, type Technology } from '../data/technologies';

// Category filter pill
function CategoryPill({
  category,
  isActive,
  onClick,
}: {
  category: Technology['category'] | 'all';
  isActive: boolean;
  onClick: () => void;
}) {
  const label = category === 'all' ? 'All' : categoryLabels[category];
  const color = category === 'all' ? '#FFFFFF' : categoryColors[category];
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-mono text-sm font-medium
        transition-colors duration-200 border-2
        ${isActive 
          ? 'border-current text-obsidian' 
          : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
        }
      `}
      style={{
        backgroundColor: isActive ? color : 'transparent',
        borderColor: isActive ? color : undefined,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}

// Individual technology card
function TechCard({
  tech,
  isHighlighted,
  isRelated,
  isDimmed,
  onHover,
  onLeave,
  onClick,
}: {
  tech: Technology;
  isHighlighted: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isDimmed ? 0.3 : 1, 
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2 },
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`
        group relative p-4 rounded-xl
        transition-all duration-300
        ${isHighlighted || isRelated 
          ? 'glass-card' 
          : 'bg-white/5 border border-white/10'
        }
      `}
      style={{
        boxShadow: isHighlighted 
          ? `0 0 30px ${tech.color}40` 
          : isRelated 
            ? `0 0 15px ${tech.color}20`
            : 'none',
      }}
      whileHover={{ y: -4 }}
    >
      {/* Glow Effect */}
      {(isHighlighted || isRelated) && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle at center, ${tech.color}10, transparent)`,
          }}
        />
      )}
      
      {/* Logo */}
      <div 
        className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center p-2 border transition-all duration-300"
        style={{ 
          borderColor: isHighlighted ? tech.color : 'rgba(255,255,255,0.1)',
          backgroundColor: isHighlighted ? `${tech.color}15` : 'rgba(255,255,255,0.05)',
        }}
      >
        <img 
          src={tech.icon} 
          alt={tech.name}
          className="w-full h-full object-contain"
          style={{
            filter: tech.id === 'nextjs' || tech.id === 'vercel' ? 'invert(1)' : 'none',
          }}
          loading="lazy"
        />
      </div>
      
      {/* Name */}
      <div className="text-center">
        <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
          {tech.name}
        </span>
      </div>
      
      {/* Category Tag */}
      <div 
        className="mt-2 text-xs font-mono uppercase tracking-wider text-center"
        style={{ color: categoryColors[tech.category] }}
      >
        {categoryLabels[tech.category]}
      </div>
      
      {/* Connection Lines (for related items) */}
      {isRelated && (
        <motion.div
          className="absolute -top-1 left-1/2 w-px h-2"
          style={{ backgroundColor: tech.color }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
        />
      )}
    </motion.button>
  );
}

// Main component
export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<Technology['category'] | 'all'>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  
  // Filter technologies by category
  const filteredTech = useMemo(() => {
    if (selectedCategory === 'all') return technologies;
    return technologies.filter(t => t.category === selectedCategory);
  }, [selectedCategory]);
  
  // Get related technologies for hovered item
  const relatedIds = useMemo(() => {
    if (!hoveredTech) return new Set<string>();
    const hovered = technologies.find(t => t.id === hoveredTech);
    return new Set(hovered?.related ?? []);
  }, [hoveredTech]);
  
  const categories: (Technology['category'] | 'all')[] = [
    'all',
    'frontend',
    'backend',
    'cloud',
    'ai',
    'mobile',
    'database',
  ];
  
  return (
    <section className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono uppercase tracking-widest text-cyber-lime border border-cyber-lime/30 rounded-full">
            Our Arsenal
          </span>
          <h2 className="text-display-md font-display font-bold text-white mb-4">
            Technology Stack
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            Click a technology to explore its ecosystem and see how we combine 
            tools to build scalable, modern solutions.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <CategoryPill
              key={category}
              category={category}
              isActive={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
        
        {/* Technology Grid */}
        <LayoutGroup>
          <motion.div 
            layout
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech) => (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  isHighlighted={hoveredTech === tech.id}
                  isRelated={relatedIds.has(tech.id)}
                  isDimmed={hoveredTech !== null && hoveredTech !== tech.id && !relatedIds.has(tech.id)}
                  onHover={() => setHoveredTech(tech.id)}
                  onLeave={() => setHoveredTech(null)}
                  onClick={() => setHoveredTech(hoveredTech === tech.id ? null : tech.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        
        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColors[key as Technology['category']] }}
              />
              <span className="text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
