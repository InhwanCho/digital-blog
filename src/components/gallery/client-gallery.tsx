/* eslint-disable @next/next/no-img-element */
'use client';

import { GalleryType } from "@/types/gallery-type";
import { Link } from "next-view-transitions";
import React, { useState } from "react";
import GalleryItems from "@/components/gallery/gallery-items";

type ClientGalleryProps = {
  items: GalleryType[];
};

export default function ClientGallery({ items }: ClientGalleryProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('created_at_desc');

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const filteredItems = selectedTags.length
    ? items.filter((item) =>
      selectedTags.every((tag) => item.tags?.includes(tag))
    )
    : items;

  const sortedItems = filteredItems.sort((a, b) => {
    const compare = (key: keyof GalleryType, ascending: boolean) => {
      const dateA = a[key] ? new Date(a[key] as string).getTime() : 0;
      const dateB = b[key] ? new Date(b[key] as string).getTime() : 0;
      return ascending ? dateA - dateB : dateB - dateA;
    };

    switch (sortOption) {
    case 'created_at_asc':
      return compare('created_at', true);
    case 'created_at_desc':
      return compare('created_at', false);
    default:
      return 0;
    }
  });

  return (
    <div className="px-4 dark:bg-gray-900">
      <nav id="filter-ui" className="flex justify-center sticky top-16 z-10">
        <div className="flex flex-col items-center my-4 bg-white dark:bg-gray-800 shadow-lg border rounded-full w-full">
          <div className="flex items-center my-4">
            <button
              onClick={() => {
                handleSortChange(sortOption === 'created_at_asc' ? 'created_at_desc' : 'created_at_asc');
              }}
              className={`px-4 py-2 mx-2 border rounded-full ${sortOption === 'created_at_asc' ? 'bg-blue-500/95 text-white' : 'bg-blue-500/95 text-white dark:bg-gray-700 dark:text-gray-300'}`}
            >
              {sortOption === 'created_at_asc' ? '최신 순' : '오래된 순'}
            </button>

            <Link href='/login' className="ml-5 p-2 border rounded-full bg-red-500 text-white">
              로그인
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 justify-center pb-3">
            {Array.from(new Set(items?.flatMap((item) => item.tags))).map((tag) => (
              <span
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-2 py-1 cursor-pointer rounded-full ${selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </nav>
      <GalleryItems items={sortedItems} handleTagClick={handleTagClick} selectedTags={selectedTags} />
    </div>
  );
};
