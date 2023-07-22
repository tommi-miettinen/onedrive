import { useState, useEffect } from "react";
import { useImageStore, fetchImages, uploadImage } from "./store/imageStore";
import FileUploader from "./components/FileUploader";
import { fetchUser, useAuthStore, logout, login } from "./store/authStore";
import Modal from "./components/Modal";
import Avatar from "./components/Avatar";
import MicrosoftLoginButton from "./components/MicrosoftLoginButton";
import ThumbnailImage from "./components/ThumbnailImage";
import { Toaster } from "sonner";
import Spinner from "./components/Spinner";

const App = () => {
  const images = useImageStore((state) => state.images);
  const loading = useImageStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);

  const [selectedImage, setSelectedImage] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    void fetchUser();
    void fetchImages();
  }, []);

  return user ? (
    <div onBlur={() => setOptionsVisible(false)} className="h-screen w-screen flex flex-col text-sm overflow-auto">
      <Toaster duration={2000} />
      <div className="flex items-center p-4 border-b sticky top-0 w-full bg-white z-10">
        <div>
          <div className="flex items-center">
            <Avatar
              aria-label={`Avatar for ${user.displayName}, click to open options`}
              onClick={(e) => {
                e.stopPropagation();
                setOptionsVisible((p) => !p);
              }}
              displayLetter={user.displayName[0]}
            />
            <span className="ml-2 text-sm">{user.displayName}</span>
          </div>
          {optionsVisible && (
            <div className="bg-white rounded absolute border mt-2 overflow-clip z-10">
              <button
                onKeyDown={(e) => e.key === "Enter" && logout()}
                onClick={logout}
                className="rounded py-2.5 px-5 focus:bg-neutral-100 hover:bg-neutral-100 text-sm"
              >
                Kirjaudu ulos
              </button>
            </div>
          )}
        </div>
        <FileUploader className="ml-auto" upload={uploadImage}>
          <button type="button" className="text-white bg-black hover:bg-opacity-80 rounded-lg text-sm px-5 py-2.5">
            Lisää kuva
          </button>
        </FileUploader>
      </div>
      {loading ? (
        <div className="flex flex-col w-full h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex flex-wrap gap-2 p-4">
          {images.map((image: Image) => (
            <ThumbnailImage
              onClick={(data) => setSelectedImage(data.url)}
              key={image.id}
              id={image.id}
              name={image.name}
              url={image["@microsoft.graph.downloadUrl"]}
            />
          ))}
        </div>
      )}
      <Modal isOpen={Boolean(selectedImage)} dismiss={() => setSelectedImage("")}>
        <img className="max-w-[80vw] max-h-[80vh] object-contain" src={selectedImage} alt="Selected" />
      </Modal>
    </div>
  ) : (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <MicrosoftLoginButton onClick={login} />
    </div>
  );
};

export default App;
