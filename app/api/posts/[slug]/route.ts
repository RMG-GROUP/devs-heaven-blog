import { NextResponse } from "next/server";
import { getAllPosts, getPost } from "@/lib/content";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  return NextResponse.json(getPost(params.slug));
}
