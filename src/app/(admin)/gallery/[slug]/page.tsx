import GalleryDetail from "@/components/gallery/gallery-detail";

export default function galleryDetailPage({ params }: { params: { slug: string } }) {

  return (
    <GalleryDetail isModal={false} />
  );
}
