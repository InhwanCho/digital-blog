import GalleryDetail from "@/components/gallery/gallery-detail";

export default function InterceptPage({ params }: { params: { slug: string } }) {  
  console.log(params.slug);
  console.log('intercept');

  return (
    <div className="bg-red-200">
      <GalleryDetail isModal={true} />
      <div>intercept</div>
    </div>
  );
}
