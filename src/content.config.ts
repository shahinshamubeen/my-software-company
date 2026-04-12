import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const blogPosts = defineCollection({
  loader: file("src/content-data/blog.json", {
    parser: (text) => JSON.parse(text).posts,
  }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
    category: z.string(),
    author: z.object({
      name: z.string(),
      role: z.string(),
      avatar: z.string().optional(),
    }),
    publishedAt: z.string(),
    readTime: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean(),
  }),
});

const caseStudies = defineCollection({
  loader: file("src/content-data/case-studies.json", {
    parser: (text) => JSON.parse(text).caseStudies,
  }),
  schema: z.object({
    order: z.number().int().positive().optional(),
    title: z.string(),
    category: z.string(),
    description: z.string(),
    longDescription: z.string(),
    image: z.string(),
    stats: z.object({
      metric: z.string(),
      value: z.string(),
    }),
    results: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        change: z.string().optional(),
      }),
    ),
    tags: z.array(z.string()),
    color: z.string(),
    challenge: z.string(),
    solution: z.string(),
    slides: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        mockupState: z.enum(["wireframe", "design", "code", "live"]),
      }),
    ),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string(),
        company: z.string(),
      })
      .optional(),
  }),
});

const jobs = defineCollection({
  loader: file("src/content-data/jobs.json", {
    parser: (text) => JSON.parse(text).jobs,
  }),
  schema: z.object({
    order: z.number().int().positive().optional(),
    title: z.string(),
    department: z.string(),
    location: z.string(),
    type: z.enum(["Full-time", "Part-time", "Contract"]),
    remote: z.enum(["Remote", "Hybrid", "On-site"]),
    experience: z.string(),
    salary: z.string(),
    description: z.string(),
    responsibilities: z.array(z.string()),
    requirements: z.array(z.string()),
    niceToHave: z.array(z.string()),
    posted: z.string(),
  }),
});

export const collections = {
  blogPosts,
  caseStudies,
  jobs,
};
