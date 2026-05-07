import { getCollection } from "astro:content";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  image?: string;
  tags: string[];
  featured: boolean;
}

const blogEntries = await getCollection("blogPosts");

export const blogPosts: BlogPost[] = blogEntries
  .map(({ data, body }) => ({
    ...data,
    content: body.trim(),
  }))
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export const categories = [...new Set(blogPosts.map((post) => post.category))];

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getRelatedPosts(
  currentId: string,
  category: string,
  limit: number = 3,
): BlogPost[] {
  const currentPost = getPost(currentId);

  if (!currentPost) {
    return [];
  }

  return blogPosts
    .filter((post) => post.id !== currentId)
    .filter(
      (post) =>
        post.category === category ||
        post.tags.some((tag) => currentPost.tags.includes(tag)),
    )
    .slice(0, limit);
}
