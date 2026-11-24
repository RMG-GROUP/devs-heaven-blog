import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Lecture des articles au moment de la compilation.
 * Le site est exporté en statique : ces fonctions ne tournent jamais en production.
 */

const BLOG_DIR = path.join(process.cwd(), "public/content/blog");

export type PostSummary = { slug: string; frontMatter: Record<string, any> };

export function getAllPosts(): PostSummary[] {
  return fs.readdirSync(BLOG_DIR).map((filename) => {
    const { data: frontMatter } = matter(fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8"));
    return { slug: filename.replace(".md", ""), frontMatter };
  });
}

export function getPost(slug: string) {
  const { data: frontMatter, content } = matter(fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf-8"));
  return { frontMatter, content };
}
