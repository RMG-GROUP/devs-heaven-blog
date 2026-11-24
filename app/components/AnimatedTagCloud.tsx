'use client';

import { useEffect, useState } from 'react';
import { TagCloud as Cloud, TagCloudProps } from 'react-tagcloud';

interface CustomTagCloudProps {
  onSelectTag: (tag: string) => void;
}

export default function AnimatedTagCloud({ onSelectTag }: CustomTagCloudProps) {
  const [tags, setTags] = useState<{ value: string; count: number }[]>([]);

  useEffect(() => {
    async function fetchTags() {
      const res = await fetch('/api/tags.json');
      const data: string[] = await res.json();
      const formattedTags = data.map((tag) => ({
        value: tag,
        count: Math.floor(Math.random() * 10) + 1, // Random count between 1 et 10
      }));
      setTags(formattedTags);
    }

    fetchTags();
  }, []);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Tags</h2>
      <div className="w-full h-64 overflow-y-scroll"> {/* Ajout de la scrollbar */}
        <Cloud
          minSize={12}
          maxSize={35}
          tags={tags}
          className="text-teal-800"
          onClick={(tag) => onSelectTag(tag.value)}
          renderer={(tag, size, color) => (
            <span
              key={tag.value}
              className={`tag-cloud-item inline-block font-semibold text-${size} cursor-pointer transition-transform duration-200 ease-in-out hover:text-teal-500 hover:scale-125 hover:cursor-pointer`}
              style={{
                fontSize: `${size}px`,
                color,
                margin: '0px 3px',
                display: 'inline-block',
              }}
            >
              {tag.value}
            </span>
          )}
        />
      </div>
    </div>
  );
}
