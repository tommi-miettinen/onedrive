import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

interface ImageResponse {
  value: Image[];
}

interface SingleImageResponse {
  value: Image;
}

const fetchImages = async (): Promise<Image[] | undefined> => {
  try {
    const res = await axios.get<ImageResponse>(`${baseUrl}/images`, {
      withCredentials: true,
    });

    return res.data.value;
  } catch (err) {
    console.log(err);
  }
};

const deleteImage = async (imageId: string) => {
  try {
    await axios.delete(`${baseUrl}/images/${imageId}`, {
      withCredentials: true,
    });

    return true;
  } catch (err) {
    console.log(err);
  }
};

const uploadImage = async (image: File): Promise<Image | undefined> => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const res = await axios.post<SingleImageResponse>(`${baseUrl}/images`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.value;
  } catch (err) {
    console.log(err);
  }
};

export default {
  fetchImages,
  deleteImage,
  uploadImage,
};
