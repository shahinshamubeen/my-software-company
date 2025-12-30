import { motion } from 'framer-motion';
import type { CaseStudy } from '../data/caseStudies';

interface RelatedProjectsProps {
  currentId: string;
  currentCategory: string;
  projects: CaseStudy[];
}

export default function RelatedProjects({ currentId, currentCategory, projects }: RelatedProjectsProps) {
  // Find related projects: same category first, then other categories
  const sameCategory = projects.filter(p => p.id !== currentId && p.category === currentCategory);
  const otherCategories = projects.filter(p => p.id !== currentId && p.category !== currentCategory);
  
  // Take up to 3 related projects, prioritizing same category
  const relatedProjects = [...sameCategory, ...otherCategories].slice(0, 3);

  if (relatedProjects.length === 0) return null;

  return (
    <section className="py-24 border-t border-glass-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-display-md font-display font-bold text-white mb-4">
            Related Projects
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explore more work in similar domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={`/work/${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-video mb-4">
                {/* Background with project color */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` 
                  }}
                />
                
                {/* Grid overlay */}
                <div className="absolute inset-0 grid-lines opacity-30" />
                
                {/* Project initial */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-6xl font-display font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ color: project.color }}
                  >
                    {project.title.split(' ')[0]}
                  </span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-obsidian/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-display font-semibold flex items-center gap-2">
                    View Project
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
              
              {/* Category badge */}
              <span 
                className="inline-block px-2 py-0.5 mb-2 text-xs font-mono uppercase tracking-widest rounded-full border"
                style={{ 
                  color: project.color, 
                  borderColor: `${project.color}40`,
                  backgroundColor: `${project.color}10`
                }}
              >
                {project.category}
              </span>
              
              {/* Title */}
              <h3 className="text-xl font-display font-semibold text-white group-hover:text-cyber-lime transition-colors mb-2">
                {project.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-white/60 line-clamp-2">
                {project.description}
              </p>
              
              {/* Stats */}
              <div className="mt-3 flex items-center gap-2">
                <span 
                  className="text-sm font-mono font-bold"
                  style={{ color: project.color }}
                >
                  {project.stats.value}
                </span>
                <span className="text-xs text-white/40">
                  {project.stats.metric}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
