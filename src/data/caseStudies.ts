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

export const caseStudies: CaseStudy[] = caseStudyEntries
  .sort((a, b) => {
    const orderA = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.data.order ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.id.localeCompare(b.id);
  })
  .map(({ id, data }) => {
    const { order: _order, ...rest } = data;
    return { id, ...rest };
  });

export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === id);
}

export function getAllCaseStudyIds(): string[] {
  return caseStudies.map((study) => study.id);
}
