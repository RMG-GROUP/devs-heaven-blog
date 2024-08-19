import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Params {
  slug: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'public/content/blog', `${slug}.md`);
  const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
  const { data: frontMatter, content } = matter(markdownWithMeta);

  return NextResponse.json({
    frontMatter,
    content,
  });
}
