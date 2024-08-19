import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const files = fs.readdirSync(path.join(process.cwd(), 'public/content/blog'));

  const posts = files.map((filename) => {
    const filePath = path.join(process.cwd(), 'public/content/blog', filename);
    const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      slug: filename.replace('.md', ''),
      frontMatter,
    };
  });

  return NextResponse.json(posts);
}
