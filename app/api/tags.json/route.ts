import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const tags = getAllPosts().flatMap((post) => post.frontMatter.tags || []);
  return NextResponse.json(Array.from(new Set(tags)));
}
