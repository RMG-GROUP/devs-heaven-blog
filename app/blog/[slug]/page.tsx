'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface Post {
  frontMatter: {
    title: string;
    image: string;
  };
  content: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post>({ frontMatter: { title: '', image: '' }, content: '' });

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${slug}`);
      const data: Post = await res.json();
      setPost(data);
    }

    fetchPost();
  }, [slug]);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">{post.frontMatter.title}</h1>
      {post.frontMatter.image && (
        <div className="mb-6">
          <Image
            src={post.frontMatter.image}
            alt={post.frontMatter.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
