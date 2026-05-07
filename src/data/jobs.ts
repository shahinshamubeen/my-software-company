import { getCollection } from "astro:content";

// Careers data for the jobs page
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  remote: "Remote" | "Hybrid" | "On-site";
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

const jobEntries = await getCollection("jobs");
const jobData = jobEntries.map(({ data }) => data);

export const jobs: Job[] = jobData
  .sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    const byPosted =
      new Date(b.posted).getTime() - new Date(a.posted).getTime();

    if (byPosted !== 0) {
      return byPosted;
    }

    return a.id.localeCompare(b.id);
  })
  .map(({ order: _order, ...rest }) => {
    return rest;
  });

export const benefits: Benefit[] = [
  {
    icon: "health",
    title: "Health & Wellness",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family. Plus $200/month wellness stipend.",
  },
  {
    icon: "vacation",
    title: "Unlimited PTO",
    description:
      "Take the time you need to recharge. We trust you to manage your schedule and deliver great work.",
  },
  {
    icon: "remote",
    title: "Remote-First",
    description:
      "Work from anywhere in the world. We provide home office setup budget and co-working space allowance.",
  },
  {
    icon: "equity",
    title: "Equity Package",
    description:
      "Share in our success with competitive equity grants. Your contributions drive our growth.",
  },
  {
    icon: "learning",
    title: "Learning Budget",
    description:
      "$3,000 annual budget for courses, conferences, and books. Never stop growing.",
  },
  {
    icon: "parental",
    title: "Parental Leave",
    description:
      "16 weeks paid parental leave for all new parents, plus flexible return-to-work options.",
  },
  {
    icon: "equipment",
    title: "Top-Tier Equipment",
    description:
      "MacBook Pro, 4K display, and any tools you need. Upgrade every 2 years.",
  },
  {
    icon: "retreats",
    title: "Team Retreats",
    description:
      "Annual all-company retreats in exciting destinations. Build connections beyond work.",
  },
];

export const values: Value[] = [
  {
    title: "Excellence Over Excuses",
    description:
      "We hold ourselves to the highest standards. When challenges arise, we find solutions, not reasons why something can't be done.",
    color: "#00FF9D",
  },
  {
    title: "Radical Transparency",
    description:
      "Open communication builds trust. We share context, admit mistakes, and give honest feedback-always with respect.",
    color: "#6366F1",
  },
  {
    title: "Impact Over Hours",
    description:
      "We measure success by outcomes, not time spent. Work smart, deliver value, and enjoy life outside of work.",
    color: "#BF00FF",
  },
  {
    title: "Continuous Learning",
    description:
      "Technology evolves fast. We stay curious, experiment boldly, and share knowledge freely across the team.",
    color: "#00FF9D",
  },
];

export const departments = [...new Set(jobs.map((job) => job.department))];

export function getJobsByDepartment(department: string): Job[] {
  return jobs.filter((job) => job.department === department);
}

export function getJob(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}
