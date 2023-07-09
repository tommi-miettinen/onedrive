import { useState, useEffect, Fragment } from "react";
import { useImageStore, fetchImages } from "./store/imageStore";
import FileUploader from "./components/FileUploader";
import { fetchUser, useAuthStore, logout, login } from "./store/authStore";
import Modal from "./components/Modal";
import Avatar from "./components/Avatar";
import MicrosoftLoginButton from "./components/MicrosoftLoginButton";
import ThumbnailImage from "./components/ThumbnailImage";
import Notifications from "./components/Notifications";

const App = () => {
  const images = useImageStore((state) => state.images);
  const user = useAuthStore((state) => state.user);

  const [selectedImage, setSelectedImage] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchImages();
  }, []);

  return user ? (
    <Fragment>
      <Notifications />
      <div className="h-screen w-screen text-gray-700">
        <div className="flex p-4 bg-neutral-100">
          <div>
            <div className="flex items-center">
              <Avatar onClick={() => setOptionsVisible((p) => !p)} displayLetter={user.displayName[0]} />{" "}
              <span className="ml-2 font-medium text-gray-700">{user.displayName}</span>
            </div>
            {optionsVisible && (
              <div className="bg-white rounded-lg absolute shadow mt-2 overflow-clip z-10">
                <button onClick={logout} className="rounded py-2.5 px-5 hover:bg-neutral-200 text-sm">
                  Kirjaudu ulos
                </button>
              </div>
            )}
          </div>
          <FileUploader className="ml-auto" onUpload={(res) => console.log(res)}>
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5"
            >
              Lisää kuva
            </button>
          </FileUploader>
        </div>
        <div className="flex flex-wrap">
          {images.map((image: any) => (
            <ThumbnailImage
              onClick={(image: any) => setSelectedImage(image["@microsoft.graph.downloadUrl"])}
              key={image.id}
              image={image}
            />
          ))}
        </div>
      </div>
      {selectedImage && (
        <Modal id="image" isVisible={Boolean(selectedImage)} toggle={() => setSelectedImage("")}>
          <img className="max-w-[80vw] max-h-[80vh]" src={selectedImage} />
        </Modal>
      )}
    </Fragment>
  ) : (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <MicrosoftLoginButton onClick={login} />
    </div>
  );
};

export default App;
