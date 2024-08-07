import GalleryDetail from "@/components/gallery/gallery-detail";

export default function galleryDetailPage({slug}:{slug:string}) {
  
  return (
    <section className='max-w-4xl xl:max-w-5xl px-4 sm:px-6 xl:px-0 mx-auto min-h-dvh'>
      <div className="flex flex-col flex-1 ">
        <GalleryDetail isModal={false} />
        
      </div >
    </section>
  );
}
