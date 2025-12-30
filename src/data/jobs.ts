// Careers data for the jobs page

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  remote: 'Remote' | 'Hybrid' | 'On-site';
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  posted: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
  color: string;
}

export const jobs: Job[] = [
  {
    id: 'senior-fullstack-engineer',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    remote: 'Remote',
    experience: '5+ years',
    salary: '$150K - $200K',
    description: 'Join our core engineering team to build scalable, high-performance applications for our enterprise clients. You\'ll work on cutting-edge projects spanning AI, fintech, and healthcare.',
    responsibilities: [
      'Design and implement scalable backend services using Node.js, Python, or Go',
      'Build responsive, accessible frontend experiences with React and TypeScript',
      'Collaborate with product and design teams to define technical requirements',
      'Mentor junior engineers and conduct code reviews',
      'Contribute to architectural decisions and technical roadmap',
    ],
    requirements: [
      '5+ years of professional software development experience',
      'Strong proficiency in TypeScript, React, and Node.js',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Solid understanding of database design and optimization',
      'Excellent communication and collaboration skills',
    ],
    niceToHave: [
      'Experience with AI/ML integration',
      'Contributions to open-source projects',
      'Experience with microservices architecture',
    ],
    posted: '2024-12-15',
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    department: 'AI Research',
    location: 'New York, NY',
    type: 'Full-time',
    remote: 'Hybrid',
    experience: '3+ years',
    salary: '$160K - $220K',
    description: 'Drive AI innovation by developing and deploying machine learning models that power intelligent features across our client products.',
    responsibilities: [
      'Design, train, and deploy production ML models',
      'Develop data pipelines for model training and inference',
      'Collaborate with engineering teams to integrate ML features',
      'Stay current with latest AI research and apply relevant findings',
      'Optimize model performance and reduce inference latency',
    ],
    requirements: [
      '3+ years of experience in machine learning engineering',
      'Strong Python skills and experience with PyTorch or TensorFlow',
      'Experience deploying models to production',
      'Solid foundation in statistics and linear algebra',
      'Experience with LLMs and prompt engineering',
    ],
    niceToHave: [
      'Published research or patents in AI/ML',
      'Experience with MLOps tools (MLflow, Kubeflow)',
      'Background in NLP or computer vision',
    ],
    posted: '2024-12-20',
  },
  {
    id: 'product-designer',
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    remote: 'Remote',
    experience: '4+ years',
    salary: '$130K - $170K',
    description: 'Shape the future of digital experiences by creating intuitive, beautiful, and accessible designs for web and mobile applications.',
    responsibilities: [
      'Lead end-to-end design for complex product features',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Develop and maintain design systems',
      'Collaborate closely with engineering and product teams',
    ],
    requirements: [
      '4+ years of product design experience',
      'Expert proficiency in Figma',
      'Strong portfolio demonstrating UX problem-solving',
      'Experience with design systems and component libraries',
      'Understanding of accessibility standards (WCAG)',
    ],
    niceToHave: [
      'Experience with motion design',
      'Front-end development skills (HTML/CSS)',
      'Experience designing for AI-powered products',
    ],
    posted: '2024-12-18',
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Austin, TX',
    type: 'Full-time',
    remote: 'Remote',
    experience: '4+ years',
    salary: '$140K - $180K',
    description: 'Build and maintain robust, scalable infrastructure that powers mission-critical applications for our clients.',
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage cloud infrastructure using IaC (Terraform, Pulumi)',
      'Implement monitoring, alerting, and observability solutions',
      'Ensure security best practices across all systems',
      'Optimize cloud costs and resource utilization',
    ],
    requirements: [
      '4+ years of DevOps or SRE experience',
      'Strong experience with Kubernetes and Docker',
      'Proficiency with AWS or GCP',
      'Experience with Infrastructure as Code',
      'Strong scripting skills (Python, Bash)',
    ],
    niceToHave: [
      'Experience with service mesh (Istio, Linkerd)',
      'Security certifications (AWS Security, CKS)',
      'Experience with GitOps workflows',
    ],
    posted: '2024-12-22',
  },
  {
    id: 'project-manager',
    title: 'Technical Project Manager',
    department: 'Operations',
    location: 'Chicago, IL',
    type: 'Full-time',
    remote: 'Hybrid',
    experience: '5+ years',
    salary: '$120K - $160K',
    description: 'Lead complex software projects from inception to delivery, ensuring client success through exceptional project management.',
    responsibilities: [
      'Manage project scope, timeline, and budget',
      'Coordinate cross-functional teams and stakeholders',
      'Identify and mitigate project risks',
      'Facilitate agile ceremonies and processes',
      'Maintain clear communication with clients and leadership',
    ],
    requirements: [
      '5+ years of technical project management experience',
      'PMP or Scrum certification preferred',
      'Strong understanding of software development lifecycle',
      'Excellent communication and leadership skills',
      'Experience with project management tools (Jira, Linear)',
    ],
    niceToHave: [
      'Software development background',
      'Experience managing remote teams',
      'Agency or consulting experience',
    ],
    posted: '2024-12-10',
  },
];

export const benefits: Benefit[] = [
  {
    icon: 'health',
    title: 'Health & Wellness',
    description: 'Comprehensive medical, dental, and vision coverage for you and your family. Plus $200/month wellness stipend.',
  },
  {
    icon: 'vacation',
    title: 'Unlimited PTO',
    description: 'Take the time you need to recharge. We trust you to manage your schedule and deliver great work.',
  },
  {
    icon: 'remote',
    title: 'Remote-First',
    description: 'Work from anywhere in the world. We provide home office setup budget and co-working space allowance.',
  },
  {
    icon: 'equity',
    title: 'Equity Package',
    description: 'Share in our success with competitive equity grants. Your contributions drive our growth.',
  },
  {
    icon: 'learning',
    title: 'Learning Budget',
    description: '$3,000 annual budget for courses, conferences, and books. Never stop growing.',
  },
  {
    icon: 'parental',
    title: 'Parental Leave',
    description: '16 weeks paid parental leave for all new parents, plus flexible return-to-work options.',
  },
  {
    icon: 'equipment',
    title: 'Top-Tier Equipment',
    description: 'MacBook Pro, 4K display, and any tools you need. Upgrade every 2 years.',
  },
  {
    icon: 'retreats',
    title: 'Team Retreats',
    description: 'Annual all-company retreats in exciting destinations. Build connections beyond work.',
  },
];

export const values: Value[] = [
  {
    title: 'Excellence Over Excuses',
    description: 'We hold ourselves to the highest standards. When challenges arise, we find solutions, not reasons why something can\'t be done.',
    color: '#00FF9D',
  },
  {
    title: 'Radical Transparency',
    description: 'Open communication builds trust. We share context, admit mistakes, and give honest feedback—always with respect.',
    color: '#6366F1',
  },
  {
    title: 'Impact Over Hours',
    description: 'We measure success by outcomes, not time spent. Work smart, deliver value, and enjoy life outside of work.',
    color: '#BF00FF',
  },
  {
    title: 'Continuous Learning',
    description: 'Technology evolves fast. We stay curious, experiment boldly, and share knowledge freely across the team.',
    color: '#00FF9D',
  },
];

export const departments = [...new Set(jobs.map(job => job.department))];

export function getJobsByDepartment(department: string): Job[] {
  return jobs.filter(job => job.department === department);
}

export function getJob(id: string): Job | undefined {
  return jobs.find(job => job.id === id);
}
