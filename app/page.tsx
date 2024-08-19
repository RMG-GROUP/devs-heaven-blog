'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  slug: string;
  frontMatter: {
    title: string;
    excerpt: string;
    image: string;
  };
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data: Post[] = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Articles récents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map(({ slug, frontMatter }) => (
          <div key={slug} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={frontMatter.image}
              alt={frontMatter.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold">{frontMatter.title}</h2>
              <p className="text-gray-600">{frontMatter.excerpt}</p>
            </div>
            <div className="p-4 bg-gray-50">
              <Link href={`/blog/${slug}`}>
                <span className="text-teal-500 font-medium cursor-pointer">Lire plus</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
