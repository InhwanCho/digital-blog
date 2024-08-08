'use client';
import GalleryDetail from "@/components/gallery/gallery-detail";
import { X } from "lucide-react";

export default function galleryDetailPage({ params }: { params: { slug: string } }) {
  
  const isModal = true;

  return (
    <section className='absolute -left-6 w-full min-h-dvh'>
      <div className="flex flex-col flex-1 ">
        <div className={`w-full h-full pt-7 sm:pt-10 ${isModal ? 'fixed z-50 bg-opacity-70 backdrop-blur-sm overflow-auto bg-gray-500 sm:py-10' : ''} `}>
          <div className={`${isModal ? 'sticky top-40' : ''} flex justify-center`}>
            <div
              className={` max-w-md w-full h-auto flex flex-col text-gray-900 space-y-8 bg-white rounded-lg p-8 ${isModal ? 'shadow-lg' : ''}`}
            >
              <div className='relative'>
                <button className={`${isModal ? 'absolute top-0 right-0' : 'hidden'}`} onClick={() => { }}>
                  <X className="size-5 text-gray-900" />
                </button>
                <div>here is the contents {params.slug}</div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </section>
  );
}
