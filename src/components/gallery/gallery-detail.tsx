/* eslint-disable @next/next/no-img-element */
'use client';

import { X } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useGalleryStore } from "@/store/galleryStore";

export interface GalleryDetailProps {
  isModal?: boolean;
}

export default function GalleryDetail({ isModal }: GalleryDetailProps) {
  const router = useRouter();
  const selectedItem = useGalleryStore((state) => state.selectedItem);

  const backbtn = useCallback(() => {
    router.back();
  }, [router]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModal && event.key === 'Escape') {
        backbtn();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isModal && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        backbtn();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [backbtn, isModal]);

  return (
    <section className='w-full absolute -left-6 h-full min-h-dvh'>
      <div className="flex flex-col flex-1">
        <div className={`w-full h-full pt-7 sm:pt-10 ${isModal ? 'fixed z-20 bg-opacity-70 backdrop-blur-sm overflow-auto bg-gray-500 sm:py-10' : ''} `}>
          <div className={`${isModal ? 'sticky top-40' : ''} flex justify-center`}>
            <div
              className={`max-w-md w-full h-auto flex flex-col text-gray-900 space-y-8 bg-white rounded-lg p-8 ${isModal ? 'shadow-lg' : ''}`}
              ref={modalRef}
            >
              <div className='relative'>
                <button className={`${isModal ? 'absolute top-0 right-0' : 'hidden'}`} onClick={backbtn}>
                  <X className="size-5 text-gray-900" />
                </button>
                
                {/* Zustand에서 가져온 데이터 표시 */}
                {selectedItem ? (
                  <div className='pt-3'>
                    <h2 className="text-xl font-bold mb-4">{selectedItem.title}</h2>
                    <img
                      src={selectedItem.image_url}
                      alt={selectedItem.description}
                      className="w-full h-auto rounded-lg"
                    />                    
                    <div className="mt-4">
                      <p>{selectedItem.description}</p>
                      <p className="text-gray-600">태그:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedItem.tags?.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-gray-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
