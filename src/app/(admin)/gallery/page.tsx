import ClientGallery from "@/components/gallery/client-gallery";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function GalleryPage() {
  const supabase = createClientComponentClient();
  // 나중에 태그 생성 시 match()로 불러오기
  const { data: galleryItems, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching gallery items:", error);
    return <p>Failed to load gallery items.</p>;
  }

  return (
    <div className="px-4">
      {/* <p>hello, {session?.user.email}</p> */}
      <ClientGallery items={galleryItems} />
    </div>
  );
};

