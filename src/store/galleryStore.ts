import { GalleryType } from "@/types/gallery-type";
import { create } from "zustand";

interface GalleryStoreState {
  selectedItem: GalleryType | null;
  setSelectedItem: (item: any) => void;
}

export const useGalleryStore = create<GalleryStoreState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
