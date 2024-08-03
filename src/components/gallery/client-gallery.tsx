/* eslint-disable @next/next/no-img-element */
'use client';

import { GalleryType } from "@/types/gallery-type";
import React, { useState } from "react";
import GithubLogin from "./github-login";

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
      selectedTags.every((tag) => item.tags.includes(tag))
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
    <div className="px-4">
      <nav id="filter-ui" className="flex justify-center sticky top-16 z-50">
        <div className="flex flex-col items-center my-4 bg-white shadow-lg border rounded-full w-full">
          <div className="flex items-center my-4">
            <button
              onClick={() => handleSortChange('created_at_asc')}
              className={`px-4 py-2 mx-2 border rounded-full ${sortOption === 'created_at_asc' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              등록일순
            </button>
            <button
              onClick={() => handleSortChange('created_at_desc')}
              className={`px-4 py-2 mx-2 border rounded-full ${sortOption === 'created_at_desc' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              등록일역순
            </button>
            {/* <LoginButton /> */}
            <GithubLogin />
          </div>
          <div className="flex flex-wrap gap-2 justify-center pb-3">
            {Array.from(new Set(items.flatMap((item) => item.tags))).map((tag) => (
              <span
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-2 py-1 cursor-pointer rounded-full ${selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sortedItems.map((item) => (
          <div key={item.id} className="relative group rounded overflow-hidden shadow-lg">
            <img
              src={item.image_url}
              alt={item.description}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 p-4 text-white">
                <p>{item.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="px-2 py-1 bg-gray-700 rounded-full cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

