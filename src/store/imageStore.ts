import { create } from "zustand";
import imageAPI from "../api/imageAPI";
import { toast } from "sonner";

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
  toast.success("Kuva poistettu.");
};

export const uploadImage = async (image: File) => {
  const promise = imageAPI.uploadImage(image);

  toast.promise(promise, {
    loading: "Lisätään kuvaa...",
    success: () => {
      fetchImages();
      return "Kuva lisätty.";
    },
    error: "Kuvan lisääminen epäonnistui.",
  });

  const data = await promise;

  if (!data) return;

  return true;
};
