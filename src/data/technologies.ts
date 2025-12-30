export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'ai' | 'mobile' | 'database';
  color: string;
  icon: string; // URL to brand icon from CDN
  related: string[];
}

// Using devicon CDN for official brand logos
const iconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const technologies: Technology[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    color: '#61DAFB',
    icon: `${iconBase}/react/react-original.svg`,
    related: ['nextjs', 'typescript', 'tailwind', 'framer'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    color: '#FFFFFF',
    icon: `${iconBase}/nextjs/nextjs-original.svg`,
    related: ['react', 'vercel', 'typescript'],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    color: '#4FC08D',
    icon: `${iconBase}/vuejs/vuejs-original.svg`,
    related: ['nuxt', 'typescript', 'tailwind'],
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'frontend',
    color: '#FF5D01',
    icon: `${iconBase}/astro/astro-original.svg`,
    related: ['react', 'vue', 'tailwind', 'vercel'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178C6',
    icon: `${iconBase}/typescript/typescript-original.svg`,
    related: ['react', 'nodejs', 'nextjs'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    category: 'frontend',
    color: '#06B6D4',
    icon: `${iconBase}/tailwindcss/tailwindcss-original.svg`,
    related: ['react', 'nextjs', 'astro'],
  },
  
  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    color: '#339933',
    icon: `${iconBase}/nodejs/nodejs-original.svg`,
    related: ['typescript', 'express', 'postgresql'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    color: '#3776AB',
    icon: `${iconBase}/python/python-original.svg`,
    related: ['django', 'fastapi', 'tensorflow'],
  },
  {
    id: 'go',
    name: 'Go',
    category: 'backend',
    color: '#00ADD8',
    icon: `${iconBase}/go/go-original-wordmark.svg`,
    related: ['kubernetes', 'docker', 'grpc'],
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'backend',
    color: '#DEA584',
    icon: `${iconBase}/rust/rust-original.svg`,
    related: ['wasm', 'kubernetes'],
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    color: '#E10098',
    icon: `${iconBase}/graphql/graphql-plain.svg`,
    related: ['nodejs', 'react', 'apollo'],
  },
  
  // Cloud
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    color: '#FF9900',
    icon: `${iconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    related: ['kubernetes', 'docker', 'terraform'],
  },
  {
    id: 'gcp',
    name: 'GCP',
    category: 'cloud',
    color: '#4285F4',
    icon: `${iconBase}/googlecloud/googlecloud-original.svg`,
    related: ['kubernetes', 'tensorflow', 'bigquery'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'cloud',
    color: '#FFFFFF',
    icon: `${iconBase}/vercel/vercel-original.svg`,
    related: ['nextjs', 'react', 'edge'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    color: '#2496ED',
    icon: `${iconBase}/docker/docker-original.svg`,
    related: ['kubernetes', 'aws', 'nodejs'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'cloud',
    color: '#326CE5',
    icon: `${iconBase}/kubernetes/kubernetes-original.svg`,
    related: ['docker', 'aws', 'gcp', 'go'],
  },
  
  // AI/ML
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'ai',
    color: '#00A67E',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    related: ['python', 'langchain', 'nodejs'],
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'ai',
    color: '#FF6F00',
    icon: `${iconBase}/tensorflow/tensorflow-original.svg`,
    related: ['python', 'gcp', 'keras'],
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    color: '#1C3C3C',
    icon: 'https://python.langchain.com/img/brand/wordmark.png',
    related: ['openai', 'python', 'pinecone'],
  },
  
  // Mobile
  {
    id: 'reactnative',
    name: 'React Native',
    category: 'mobile',
    color: '#61DAFB',
    icon: `${iconBase}/react/react-original.svg`,
    related: ['react', 'typescript', 'expo'],
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    color: '#02569B',
    icon: `${iconBase}/flutter/flutter-original.svg`,
    related: ['dart', 'firebase'],
  },
  {
    id: 'swift',
    name: 'Swift',
    category: 'mobile',
    color: '#F05138',
    icon: `${iconBase}/swift/swift-original.svg`,
    related: ['ios', 'xcode'],
  },
  
  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    color: '#4169E1',
    icon: `${iconBase}/postgresql/postgresql-original.svg`,
    related: ['nodejs', 'prisma', 'supabase'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    color: '#47A248',
    icon: `${iconBase}/mongodb/mongodb-original.svg`,
    related: ['nodejs', 'mongoose'],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    color: '#DC382D',
    icon: `${iconBase}/redis/redis-original.svg`,
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
