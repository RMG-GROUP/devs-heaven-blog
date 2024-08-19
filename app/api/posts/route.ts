import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

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

  const filteredPosts = searchTerm
    ? posts.filter((post) =>
        post.frontMatter.title.toLowerCase().includes(searchTerm) ||
        post.frontMatter.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm)
        )
      )
    : posts;

  return NextResponse.json(filteredPosts);
}
