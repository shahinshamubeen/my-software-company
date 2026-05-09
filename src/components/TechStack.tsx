import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  {
    id: 'frontend',
    name: 'Frontend & UI',
    accent: 'bg-cyber-lime',
    borderHover: 'hover:border-cyber-lime/40',
    textGlow: 'text-cyber-lime',
    shadow: 'shadow-[0_0_20px_rgba(0,255,157,0.4)]',
    techs: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Vue.js', slug: 'vuedotjs' },
      { name: 'Svelte', slug: 'svelte' },
      { name: 'Astro', slug: 'astro' },
      { name: 'Angular', slug: 'angular' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Framer', slug: 'framer' },
      { name: 'Three.js', slug: 'threedotjs' },
      { name: 'Redux', slug: 'redux' },
      { name: 'Vite', slug: 'vite' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend & Core',
    accent: 'bg-electric-indigo',
    borderHover: 'hover:border-electric-indigo/40',
    textGlow: 'text-electric-indigo',
    shadow: 'shadow-[0_0_20px_rgba(99,102,241,0.4)]',
    techs: [
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Python', slug: 'python' },
      { name: 'Go', slug: 'go' },
      { name: 'Java', slug: 'openjdk' },
      { name: 'C#', slug: 'csharp' },
      { name: 'Rust', slug: 'rust' },
      { name: 'Ruby on Rails', slug: 'rubyonrails' },
      { name: 'PHP', slug: 'php' },
      { name: 'GraphQL', slug: 'graphql' },
      { name: 'Express', slug: 'express' },
      { name: 'NestJS', slug: 'nestjs' },
      { name: 'Socket.io', slug: 'socketdotio' }
    ]
  },
  {
    id: 'database',
    name: 'Data & Storage',
    accent: 'bg-electric-purple',
    borderHover: 'hover:border-electric-purple/40',
    textGlow: 'text-electric-purple',
    shadow: 'shadow-[0_0_20px_rgba(191,0,255,0.4)]',
    techs: [
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'MySQL', slug: 'mysql' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'Redis', slug: 'redis' },
      { name: 'Elasticsearch', slug: 'elasticsearch' },
      { name: 'Supabase', slug: 'supabase' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'Snowflake', slug: 'snowflake' },
      { name: 'Cassandra', slug: 'apachecassandra' },
      { name: 'DynamoDB', slug: 'amazondynamodb' },
      { name: 'Neo4j', slug: 'neo4j' },
      { name: 'Kafka', slug: 'apachekafka' }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    accent: 'bg-terminal-green',
    borderHover: 'hover:border-terminal-green/40',
    textGlow: 'text-terminal-green',
    shadow: 'shadow-[0_0_20px_rgba(0,255,65,0.4)]',
    techs: [
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'Google Cloud', slug: 'googlecloud' },
      { name: 'Azure', slug: 'microsoftazure' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'Terraform', slug: 'terraform' },
      { name: 'GitHub Actions', slug: 'githubactions' },
      { name: 'GitLab', slug: 'gitlab' },
      { name: 'Vercel', slug: 'vercel' },
      { name: 'Cloudflare', slug: 'cloudflare' },
      { name: 'Datadog', slug: 'datadog' },
      { name: 'Nginx', slug: 'nginx' }
    ]
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    accent: 'bg-warning-yellow',
    borderHover: 'hover:border-warning-yellow/40',
    textGlow: 'text-warning-yellow',
    shadow: 'shadow-[0_0_20px_rgba(255,215,0,0.4)]',
    techs: [
      { name: 'OpenAI', slug: 'openai' },
      { name: 'Anthropic', slug: 'anthropic' },
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'LangChain', slug: 'langchain' },
      { name: 'Hugging Face', slug: 'huggingface' },
      { name: 'Scikit-learn', slug: 'scikitlearn' },
      { name: 'Pinecone', slug: 'pinecone' },
      { name: 'Jupyter', slug: 'jupyter' },
      { name: 'Keras', slug: 'keras' },
      { name: 'OpenCV', slug: 'opencv' },
      { name: 'Python', slug: 'python' }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile & Apps',
    accent: 'bg-hot-pink',
    borderHover: 'hover:border-hot-pink/40',
    textGlow: 'text-hot-pink',
    shadow: 'shadow-[0_0_20px_rgba(255,0,110,0.4)]',
    techs: [
      { name: 'React Native', slug: 'react' },
      { name: 'Flutter', slug: 'flutter' },
      { name: 'Swift', slug: 'swift' },
      { name: 'Kotlin', slug: 'kotlin' },
      { name: 'Expo', slug: 'expo' },
      { name: 'Android', slug: 'android' },
      { name: 'Apple', slug: 'apple' },
      { name: 'Capacitor', slug: 'capacitor' },
      { name: 'Ionic', slug: 'ionic' },
      { name: 'Tauri', slug: 'tauri' },
      { name: 'Electron', slug: 'electron' },
      { name: 'Unity', slug: 'unity' }
    ]
  }
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  return (
    <section className="py-24 md:py-32 relative bg-obsidian overflow-hidden border-t border-white/5">
      {/* Dynamic Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] transition-colors duration-1000 mix-blend-screen">
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] transition-all duration-1000 ${
            categories.find(c => c.id === activeCategory)?.accent || 'bg-white/10'
          }`}
        ></div>
      </div>

      <div className="section-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${categories.find(c => c.id === activeCategory)?.accent}`}></span>
            <span className="text-sm font-mono text-white/80 tracking-wide uppercase">Complete Arsenal</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-display-md md:text-display-lg font-display font-bold text-white mb-6"
          >
            Built With The Best
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed"
          >
            We deploy the right tools for the job. From highly-interactive frontend interfaces to infinitely scalable infrastructure and bleeding-edge AI models.
          </motion.p>
        </div>

        {/* Layout Grid */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Categories Sidebar */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar w-full lg:w-72 shrink-0 relative z-20">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    relative flex items-center justify-between px-5 py-4 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 border
                    ${isActive 
                      ? `bg-white/[0.05] border-white/10` 
                      : `bg-transparent border-transparent text-white/50 hover:bg-white/[0.02] hover:text-white/80`
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? `${category.accent} ${category.shadow}` : 'bg-white/20'}`}></div>
                    <span className={`font-display font-semibold text-lg tracking-wide transition-colors ${isActive ? 'text-white' : ''}`}>
                      {category.name}
                    </span>
                  </div>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[2px] lg:bottom-0 lg:top-0 lg:left-0 lg:right-auto lg:w-[3px] lg:h-full rounded-full ${category.accent}`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tech Grid Display */}
          <div className="flex-1 min-h-[500px] relative z-10">
            <AnimatePresence mode="wait">
              {categories.map((category) => (
                category.id === activeCategory && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                  >
                    {category.techs.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className={`
                          group relative flex items-center gap-4 p-4 md:p-5 rounded-xl 
                          bg-white/[0.02] border border-white/5 backdrop-blur-sm
                          transition-all duration-300 overflow-hidden cursor-default
                          hover:bg-white/[0.04] ${category.borderHover} hover:-translate-y-1
                        `}
                      >
                        {/* Hover Gradient Overlay */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-transparent to-${category.accent.replace('bg-', '')}`}></div>
                        
                        {/* External SVG Logo from Simple Icons */}
                        <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 shadow-inner-glow">
                          <img 
                            src={`https://cdn.simpleicons.org/${tech.slug}/ffffff`} 
                            alt={tech.name}
                            className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>

                        <span className={`font-display text-base font-semibold text-white/80 group-hover:${category.textGlow} transition-colors duration-300`}>
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
