import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getAllPosts().filter((post) => post.frontMatter.featured).slice(0, 3));
}
