'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const observer = useRef<IntersectionObserver>();

  const loadedSlugs = useRef<Set<string>>(new Set());

  useEffect(() => {
    loadPosts(page, searchTerm);
  }, [page, searchTerm]);

  async function loadPosts(page: number, searchTerm: string) {
    setLoading(true);
    const res = await fetch(`/api/posts?page=${page}&limit=6&search=${searchTerm}`);
    const newPosts: Post[] = await res.json();

    // Filtrer les articles déjà existants en vérifiant leurs slugs
    const filteredNewPosts = newPosts.filter(newPost => {
      if (loadedSlugs.current.has(newPost.slug)) {
        return false;
      }
      loadedSlugs.current.add(newPost.slug);
      return true;
    });

    setPosts((prevPosts) => [...prevPosts, ...filteredNewPosts]);
    setLoading(false);

    if (newPosts.length === 0 || newPosts.length < 6) {
      setHasMore(false);
    }
  }

  const lastPostElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }
  }, [loading, hasMore]);

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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPosts([]); // Reset posts when search changes
                setPage(1); // Reset to first page on search
                setHasMore(true); // Reset "has more" when search changes
                loadedSlugs.current.clear(); // Clear the slugs Set when search changes
              }}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Image src="/search-icon.svg" alt="search" width={20} height={20} />
            </div>
          </div>

          {/* Nuage de Tags - Affiché juste après la barre de recherche sur mobile */}
          <div className="block md:hidden mb-6">
            <AnimatedTagCloud onSelectTag={(tag) => {
              setSearchTerm(tag);
              setPosts([]);
              setPage(1);
              setHasMore(true);
              loadedSlugs.current.clear();
            }} />
          </div>

          {/* Liste des articles récents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {posts.map((post, index) => {
              const isLastPost = posts.length === index + 1;
              return (
                <div
                  key={post.slug}
                  ref={isLastPost ? lastPostElementRef : null}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={post.frontMatter.image}
                    alt={post.frontMatter.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">{post.frontMatter.title}</h2>
                    <p className="text-gray-600 mt-2">{post.frontMatter.excerpt}</p>
                    <div className="mt-4">
                      {post.frontMatter.tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={() => {
                            setSearchTerm(tag);
                            setPosts([]);
                            setPage(1);
                            setHasMore(true);
                            loadedSlugs.current.clear();
                          }}
                          className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer hover:bg-teal-200 transition-colors duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="text-teal-500 font-medium cursor-pointer hover:underline">Lire plus</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {loading && (
            <div className="flex justify-center mt-6">
              <p>Chargement...</p>
            </div>
          )}
        </div>

        {/* Nuage de Tags - Affiché à droite des articles récents sur les écrans plus grands */}
        <div className="hidden md:block md:w-1/3 md:pl-8">
          <AnimatedTagCloud onSelectTag={(tag) => {
            setSearchTerm(tag);
            setPosts([]);
            setPage(1);
            setHasMore(true);
            loadedSlugs.current.clear();
          }} />
        </div>
      </div>
    </div>
  );
}
