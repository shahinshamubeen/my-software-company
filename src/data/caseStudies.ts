import { getCollection } from "astro:content";

// Case studies data shared across pages
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  stats: {
    metric: string;
    value: string;
  };
  results: {
    label: string;
    value: string;
    change?: string;
  }[];
  tags: string[];
  color: string;
  challenge: string;
  solution: string;
  slides: {
    title: string;
    description: string;
    mockupState: "wireframe" | "design" | "code" | "live";
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

const caseStudyEntries = await getCollection("caseStudies");
const caseStudyData = caseStudyEntries.map(({ data }) => data);

export const caseStudies: CaseStudy[] = caseStudyData
  .sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.id.localeCompare(b.id);
  })
  .map(({ order: _order, ...rest }) => {
    return rest;
  });

export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === id);
}

export function getAllCaseStudyIds(): string[] {
  return caseStudies.map((study) => study.id);
}
