import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/content";

// Export statique : liste complète générée à la compilation.
// Pagination et recherche se font côté navigateur.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getAllPosts());
}
