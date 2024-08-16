/* eslint-disable @next/next/no-img-element */
'use client';

import { GalleryType } from "@/types/gallery-type";
import { useRouter } from "next/navigation";
import { useGalleryStore } from "@/store/galleryStore"; // zustand store import

type GalleryItemProps = {
  items: GalleryType[];
  handleTagClick: (tag: string) => void;
  selectedTags: string[];
};

export default function GalleryItems({ items, handleTagClick, selectedTags }: GalleryItemProps) {
  const router = useRouter();
  const setSelectedItem = useGalleryStore((state) => state.setSelectedItem); 

  const handleItemClick = (item: GalleryType) => {
    setSelectedItem(item); 
    router.push(`/gallery/${item.id}`); 
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <button
          onClick={() => handleItemClick(item)}
          key={item.id}
          className="relative group rounded overflow-hidden shadow-lg dark:shadow-gray-800"
        >
          <img
            src={item.image_url}
            alt={item.description}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 p-4 text-white">              
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagClick(tag);
                    }}
                    className={`px-2 py-1 bg-gray-700 dark:bg-gray-600 rounded-full cursor-pointer ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
