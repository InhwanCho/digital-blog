import GalleryDetail from "@/components/gallery/gallery-detail";

export default function InterceptPage({ params }: { params: { slug: string } }) {  
  return (
    <GalleryDetail isModal={true} />
  );
}
