import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cursor = Number(url.searchParams.get('cursor')) || 0;
  const limit = 5;

  const files = fs.readdirSync(path.join('public/content/blog'));
  const total = files.length;
  const paginatedFiles = files.slice(cursor, cursor + limit);

  const posts = paginatedFiles.map((filename) => {
    const filePath = path.join('public/content/blog', filename);
    const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      slug: filename.replace('.md', ''),
      frontMatter,
    };
  });

  const nextCursor = cursor + limit < total ? cursor + limit : null;

  return NextResponse.json({
    posts,
    nextCursor,
  });
}
