// @/app/gallery/page.tsx

import Gallery from "@/components/gallery/gallery-ui";
import { createClient } from "@/lib/supabase";

const GalleryPage = async () => {
  const supabase = createClient();

  const { data: galleryItems, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching gallery items:", error);
    return <p>Failed to load gallery items.</p>;
  }

  return <Gallery items={galleryItems} />;
};

export default GalleryPage;
