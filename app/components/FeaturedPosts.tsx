'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FeaturedPost {
  slug: string;
  frontMatter: {
    title: string;
    excerpt: string;
    image: string;
    tags: string[];
  };
}

export default function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([]);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      const res = await fetch('/api/posts/featured');
      const data: FeaturedPost[] = await res.json();
      setFeaturedPosts(data);
    }

    fetchFeaturedPosts();
  }, []);

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Articles mis en avant</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredPosts.map(({ slug, frontMatter }) => (
          <div key={slug} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <Image
              src={frontMatter.image}
              alt={frontMatter.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{frontMatter.title}</h3>
              <p className="text-gray-600 mt-2">{frontMatter.excerpt}</p>
              <div className="mt-4">
                {frontMatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <Link href={`/blog/${slug}`}>
                <span className="text-teal-500 font-medium cursor-pointer hover:underline">Lire plus</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
