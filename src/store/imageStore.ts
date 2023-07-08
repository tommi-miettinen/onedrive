import { create } from "zustand";
import imageAPI from "../api/imageAPI";

interface ImageStore {
  images: any[];
}

export const useImageStore = create<ImageStore>(() => ({
  images: [],
}));

export const fetchImages = async () => {
  const images = await imageAPI.fetchImages();
  if (!images) return;
  useImageStore.setState({ images: images.value });
};

export const deleteImage = async (imageId: string) => {
  const deleted = await imageAPI.deleteImage(imageId);
  if (!deleted) return;

  useImageStore.setState({ images: useImageStore.getState().images.filter((img) => img.id !== imageId) });
};

export const uploadImage = async (image: File) => {
  const data = await imageAPI.uploadImage(image);
  if (!data) return;

  fetchImages();
  return true;
};
