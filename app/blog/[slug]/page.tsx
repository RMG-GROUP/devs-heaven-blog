import { getAllPosts } from "@/lib/content";
import ArticleClient from "./ArticleClient";

export const dynamicParams = false;

// Export statique : une page générée par article
export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export default function Page() {
  return <ArticleClient />;
}
