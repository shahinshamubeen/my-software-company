export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'ai' | 'mobile' | 'database';
  color: string;
  symbol: string;
  related: string[];
}

export const technologies: Technology[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    color: '#61DAFB',
    symbol: 'Re',
    related: ['nextjs', 'typescript', 'tailwind', 'framer'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    color: '#FFFFFF',
    symbol: 'Nx',
    related: ['react', 'vercel', 'typescript'],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    color: '#4FC08D',
    symbol: 'Vu',
    related: ['nuxt', 'typescript', 'tailwind'],
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'frontend',
    color: '#FF5D01',
    symbol: 'As',
    related: ['react', 'vue', 'tailwind', 'vercel'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178C6',
    symbol: 'Ts',
    related: ['react', 'nodejs', 'nextjs'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    category: 'frontend',
    color: '#06B6D4',
    symbol: 'Tw',
    related: ['react', 'nextjs', 'astro'],
  },
  
  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    color: '#339933',
    symbol: 'No',
    related: ['typescript', 'express', 'postgresql'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    color: '#3776AB',
    symbol: 'Py',
    related: ['django', 'fastapi', 'tensorflow'],
  },
  {
    id: 'go',
    name: 'Go',
    category: 'backend',
    color: '#00ADD8',
    symbol: 'Go',
    related: ['kubernetes', 'docker', 'grpc'],
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'backend',
    color: '#DEA584',
    symbol: 'Rs',
    related: ['wasm', 'kubernetes'],
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    color: '#E10098',
    symbol: 'Gq',
    related: ['nodejs', 'react', 'apollo'],
  },
  
  // Cloud
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    color: '#FF9900',
    symbol: 'Aw',
    related: ['kubernetes', 'docker', 'terraform'],
  },
  {
    id: 'gcp',
    name: 'GCP',
    category: 'cloud',
    color: '#4285F4',
    symbol: 'Gc',
    related: ['kubernetes', 'tensorflow', 'bigquery'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'cloud',
    color: '#FFFFFF',
    symbol: 'Ve',
    related: ['nextjs', 'react', 'edge'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    color: '#2496ED',
    symbol: 'Dk',
    related: ['kubernetes', 'aws', 'nodejs'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'cloud',
    color: '#326CE5',
    symbol: 'K8',
    related: ['docker', 'aws', 'gcp', 'go'],
  },
  
  // AI/ML
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'ai',
    color: '#00A67E',
    symbol: 'Oi',
    related: ['python', 'langchain', 'nodejs'],
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'ai',
    color: '#FF6F00',
    symbol: 'Tf',
    related: ['python', 'gcp', 'keras'],
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    color: '#1C3C3C',
    symbol: 'Lc',
    related: ['openai', 'python', 'pinecone'],
  },
  
  // Mobile
  {
    id: 'reactnative',
    name: 'React Native',
    category: 'mobile',
    color: '#61DAFB',
    symbol: 'Rn',
    related: ['react', 'typescript', 'expo'],
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    color: '#02569B',
    symbol: 'Fl',
    related: ['dart', 'firebase'],
  },
  {
    id: 'swift',
    name: 'Swift',
    category: 'mobile',
    color: '#F05138',
    symbol: 'Sw',
    related: ['ios', 'xcode'],
  },
  
  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    color: '#4169E1',
    symbol: 'Pg',
    related: ['nodejs', 'prisma', 'supabase'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    color: '#47A248',
    symbol: 'Md',
    related: ['nodejs', 'mongoose'],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    color: '#DC382D',
    symbol: 'Rd',
    related: ['nodejs', 'caching'],
  },
];

export const categoryLabels: Record<Technology['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  cloud: 'Cloud & DevOps',
  ai: 'AI & ML',
  mobile: 'Mobile',
  database: 'Database',
};

export const categoryColors: Record<Technology['category'], string> = {
  frontend: '#00FF9D',
  backend: '#6366F1',
  cloud: '#FF9900',
  ai: '#00A67E',
  mobile: '#61DAFB',
  database: '#4169E1',
};
