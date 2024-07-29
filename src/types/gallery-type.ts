export interface GalleryType {
  id: number;
  image_url: string;
  description: string;
  tags: string[];
  created_at: string;
  pic_created_at?: string;
  edited_at?: string;
};