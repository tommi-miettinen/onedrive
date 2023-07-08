import { useState, useEffect, Fragment } from "react";
import { useImageStore, fetchImages, deleteImage } from "./store/imageStore";
import FileUploader from "./components/FileUploader";
import { fetchUser, useAuthStore } from "./store/authStore";
import Modal from "./components/Modal";

const ImageThumbnail = ({ image, onClick }: { image: any; onClick: (image: any) => any }) => {
  return (
    <div onClick={() => onClick(image)} className="p-4 flex flex-col m-2 rounded hover:bg-neutral-100">
      <img className="w-[200px]" src={image["@microsoft.graph.downloadUrl"]} />
      <span className="py-2">{image.name}</span>
      <button onClick={() => deleteImage(image.id)}>poista</button>
    </div>
  );
};

function App() {
  const images = useImageStore((state) => state.images);
  const user = useAuthStore((state) => state.user);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchUser();
    fetchImages();
  }, []);

  console.log(selectedImage);

  return (
    <Fragment>
      <div className="h-screen w-screen">
        <h1 className="text-3xl font-bold p-2">{user && user.displayName}</h1>{" "}
        <div className="flex flex-wrap">
          {images.map((image: any) => (
            <ImageThumbnail
              onClick={(image: any) => setSelectedImage(image["@microsoft.graph.downloadUrl"])}
              key={image.id}
              image={image}
            />
          ))}
        </div>
        <div>
          <FileUploader onUpload={(res) => console.log(res)}>
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5"
            >
              Lisää kuva
            </button>
          </FileUploader>
        </div>
      </div>
      {selectedImage && (
        <Modal id="image" isVisible={Boolean(selectedImage)} toggle={() => setSelectedImage("")}>
          <img height={500} src={selectedImage} />
        </Modal>
      )}
    </Fragment>
  );
}

export default App;
