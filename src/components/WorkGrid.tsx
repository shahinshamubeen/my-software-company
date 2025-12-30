import { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import type { CaseStudy } from '../data/caseStudies';

interface WorkGridProps {
  caseStudies: CaseStudy[];
  categories: string[];
}

export default function WorkGrid({ caseStudies, categories }: WorkGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'category'>('default');

  // Filter and sort case studies
  const filteredStudies = useMemo(() => {
    let studies = activeCategory === 'All'
      ? caseStudies
      : caseStudies.filter(s => s.category === activeCategory);

    if (sortBy === 'name') {
      studies = [...studies].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'category') {
      studies = [...studies].sort((a, b) => a.category.localeCompare(b.category));
    }

    return studies;
  }, [caseStudies, activeCategory, sortBy]);

  // Count projects per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: caseStudies.length };
    caseStudies.forEach(study => {
      counts[study.category] = (counts[study.category] || 0) + 1;
    });
    return counts;
  }, [caseStudies]);

  return (
    <div>
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 border
                flex items-center gap-2
                ${activeCategory === category
                  ? 'bg-cyber-lime text-obsidian border-cyber-lime'
                  : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                }
              `}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="projects-grid"
            >
              {category}
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full
                ${activeCategory === category
                  ? 'bg-obsidian/20 text-obsidian'
                  : 'bg-white/10 text-white/50'
                }
              `}>
                {categoryCounts[category] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-white/50">Sort:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyber-lime"
          >
            <option value="default" className="bg-obsidian">Default</option>
            <option value="name" className="bg-obsidian">Name A-Z</option>
            <option value="category" className="bg-obsidian">Category</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6 text-sm text-white/50">
        Showing <span className="text-cyber-lime font-mono">{filteredStudies.length}</span> project{filteredStudies.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' && (
          <> in <span className="text-white/70">{activeCategory}</span></>
        )}
      </div>

      {/* Projects Grid */}
      <LayoutGroup>
        <motion.div
          id="projects-grid"
          role="tabpanel"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study) => (
              <motion.a
                key={study.id}
                href={`/work/${study.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  opacity: { duration: 0.2 },
                  layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                }}
                className="group relative overflow-hidden rounded-2xl bg-carbon border border-glass-border hover:border-white/20 transition-all duration-500 focus-visible:ring-2 focus-visible:ring-cyber-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                aria-label={`View case study: ${study.title} - ${study.category}`}
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${study.color}20, ${study.color}05)` }}
                  />
                  <div className="absolute inset-0 grid-lines opacity-50" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 glass-card text-sm font-medium text-white">
                      View Case Study
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: study.color }}
                  >
                    {study.category}
                  </span>
                  <h3 className="mt-2 text-xl font-display font-semibold text-white group-hover:text-cyber-lime transition-colors">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {study.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span
                      className="text-2xl font-bold font-mono"
                      style={{ color: study.color }}
                    >
                      {study.stats.value}
                    </span>
                    <span className="text-xs text-white/60 uppercase">
                      {study.stats.metric}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono text-white/50 bg-white/5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {study.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs font-mono text-white/40">
                        +{study.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Accent Border */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: study.color }}
                />
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Empty State */}
      {filteredStudies.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <p className="text-white/50">No projects found in this category.</p>
          <button
            onClick={() => setActiveCategory('All')}
            className="mt-4 text-cyber-lime hover:underline"
          >
            View all projects
          </button>
        </div>
      )}
    </div>
  );
}
