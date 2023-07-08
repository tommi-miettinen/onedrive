import axios from "axios";

const baseUrl = "http://localhost:5205";

const fetchImages = async () => {
  try {
    const res = await axios.get(`${baseUrl}/images`, {
      withCredentials: true,
    });

    console.log(res.data);

    return res.data;
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

const uploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const res = await axios.post(`${baseUrl}/images`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default {
  fetchImages,
  deleteImage,
  uploadImage,
};
