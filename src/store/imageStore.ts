import { create } from "zustand";
import imageAPI from "../api/imageAPI";
import { toast } from "sonner";

interface ImageStore {
  images: Image[];
  loading: boolean;
}

export const useImageStore = create<ImageStore>(() => ({
  images: [],
  loading: false,
}));

export const setLoading = (loading: boolean) => useImageStore.setState({ loading });

export const fetchImages = async () => {
  setLoading(true);
  const images = await imageAPI.fetchImages();
  setLoading(false);

  if (!images) return;

  useImageStore.setState({ images });
};

export const deleteImage = async (imageId: string) => {
  const deleted = await imageAPI.deleteImage(imageId);
  if (!deleted) return;

  useImageStore.setState({ images: useImageStore.getState().images.filter((img) => img.id !== imageId) });
  toast.success("Kuva poistettu.");
};

export const uploadImage = async (image: File) => {
  const promise = imageAPI.uploadImage(image);

  void toast.promise(promise, {
    loading: "Lisätään kuvaa...",
    success: () => {
      //Image is broken after upload so refetching all
      fetchImages();
      return "Kuva lisätty.";
    },
    error: "Kuvan lisääminen epäonnistui.",
  });
};
