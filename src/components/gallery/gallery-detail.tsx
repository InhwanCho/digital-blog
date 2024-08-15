'use client';

import { X } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export interface GalleryDetailProps {
  isModal?: boolean;
}

export default function GalleryDetail({ isModal }: GalleryDetailProps) {
  const router = useRouter();

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

  useEffect(() => {
    console.log('gallery detail');
  }, []);

  return (
    <section className='w-full absolute -left-6 h-full min-h-dvh bg-red-200'>
      <div className="flex flex-col flex-1">
        <div className={`w-full h-full pt-7 sm:pt-10 ${isModal ? 'fixed z-50 bg-opacity-70 backdrop-blur-sm overflow-auto bg-gray-500 sm:py-10' : ''} `}>
          <div className={`${isModal ? 'sticky top-40' : ''} flex justify-center`}>
            <div
              className={` max-w-md w-full h-auto flex flex-col text-gray-900 space-y-8 bg-white rounded-lg p-8 ${isModal ? 'shadow-lg' : ''}`}
              ref={modalRef}
            >
              <div className='relative'>
                <button className={`${isModal ? 'absolute top-0 right-0' : 'hidden'}`} onClick={backbtn}>
                  <X className="size-5 text-gray-900" />
                </button>
                <div>here is the contents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
