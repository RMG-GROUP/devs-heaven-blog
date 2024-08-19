'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FeaturedPosts from './components/FeaturedPosts';
import AnimatedTagCloud from './components/AnimatedTagCloud';

interface Post {
  slug: string;
  frontMatter: {
    title: string;
    excerpt: string;
    image: string;
    tags: string[];
  };
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`/api/posts${searchTerm ? `?search=${searchTerm}` : ''}`);
      const data: Post[] = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, [searchTerm]);

  return (
    <div className="container mx-auto">
      {/* Section Featured Posts */}
      <FeaturedPosts />

      {/* Section Articles Récents et Nuage de Tags */}
      <div className="flex flex-col md:flex-row">
        {/* Articles Récents */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Articles récents</h1>
          
          {/* Barre de Recherche avec Loupe */}
          <div className="relative mb-6 max-w-md">
            <input
              type="text"
              id="search"
              placeholder="Rechercher par titre ou tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
          </div>

          {/* Nuage de Tags - Affiché juste après la barre de recherche sur mobile */}
          <div className="block md:hidden mb-6">
            <AnimatedTagCloud onSelectTag={(tag) => setSearchTerm(tag)} />
          </div>

          {/* Liste des articles récents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {posts.map(({ slug, frontMatter }) => (
              <div key={slug} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={frontMatter.image}
                  alt={frontMatter.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900">{frontMatter.title}</h2>
                  <p className="text-gray-600 mt-2">{frontMatter.excerpt}</p>
                  <div className="mt-4">
                    {frontMatter.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer hover:bg-teal-200 transition-colors duration-300"
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

        {/* Nuage de Tags - Affiché à droite des articles récents sur les écrans plus grands */}
        <div className="hidden md:block md:w-1/3 md:pl-8">
          <AnimatedTagCloud onSelectTag={(tag) => setSearchTerm(tag)} />
        </div>
      </div>
    </div>
  );
}
