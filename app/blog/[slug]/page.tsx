'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  slug: string;
  frontMatter: {
    title: string;
    excerpt: string;
    date: string;
    image: string;
    tags: string[];
  };
  content: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [prevPost, setPrevPost] = useState<string | null>(null);
  const [nextPost, setNextPost] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${slug}`);
      const data = await res.json();
      setPost(data);
    }

    async function fetchAllPosts() {
      const res = await fetch('/api/posts');
      const posts: Post[] = await res.json();

      const currentIndex = posts.findIndex((p) => p.slug === slug);
      if (currentIndex > 0) {
        setPrevPost(posts[currentIndex - 1].slug);
      }
      if (currentIndex < posts.length - 1) {
        setNextPost(posts[currentIndex + 1].slug);
      }
    }

    fetchPost();
    fetchAllPosts();
  }, [slug]);

  if (!post) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Titre de l'article */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900">{post.frontMatter.title}</h1>

      {/* Excerpt */}
      <p className="text-lg text-gray-600 mb-8">{post.frontMatter.excerpt}</p>

      {/* Image de l'article */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={post.frontMatter.image}
          alt={post.frontMatter.title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
      </div>

      {/* Contenu de l'article */}
      <article className="prose prose-lg lg:prose-xl mx-auto text-gray-800">
        <ReactMarkdown components={{
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-10">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mb-4 mt-8">{children}</h3>,
          p: ({ children }) => <p className="mb-6">{children}</p>,
        }}>
          {post.content}
        </ReactMarkdown>
      </article>

      {/* Navigation entre articles */}
      <div className="flex justify-between items-center mt-12">
        {prevPost && (
          <Link href={`/blog/${prevPost}`} className="text-teal-500 font-medium hover:underline">
            ← Article précédent
          </Link>
        )}
        {nextPost && (
          <Link href={`/blog/${nextPost}`} className="text-teal-500 font-medium hover:underline ml-auto">
            Article suivant →
          </Link>
        )}
      </div>
    </div>
  );
}
