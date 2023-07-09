import { create } from "zustand";
import imageAPI from "../api/imageAPI";
import { notify } from "./notificationStore";

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
  notify({ type: "success", message: "Kuva poistettu." });
};

export const uploadImage = async (image: File) => {
  const data = await imageAPI.uploadImage(image);
  if (!data) return;

  fetchImages();
  notify({ type: "success", message: "Kuva lisätty." });
  return true;
};
