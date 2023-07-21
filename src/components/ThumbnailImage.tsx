import { useState, Fragment } from "react";
import { deleteImage } from "../store/imageStore";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const ThumbnailImage = ({ image, onClick }: { image: any; onClick: (image: any) => any }) => {
  const [deleting, setDeleting] = useState(false);

  return (
    <Fragment>
      <div
        onClick={() => onClick(image)}
        className="sm:max-h-[180px]  sm:max-w-[180px] rounded overflow-clip flex flex-col cursor-pointer hover:opacity-80 hover:bg-neutral-100"
      >
        <img className="w-full bg-black h-full rounded object-cover clip border" src={image["@microsoft.graph.downloadUrl"]} />

        <div className="p-2 flex">
          <span className="py-2">{image.name}</span>
          <button
            className="rounded text-black  hover:bg-neutral-200 p-2.5 w-min mt-auto ml-auto"
            onClick={(e) => {
              e.stopPropagation();
              setDeleting(true);
            }}
          >
            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
              />
            </svg>
          </button>
        </div>
      </div>
      {deleting && (
        <DeleteConfirmationModal
          message={`Poistetaanko ${image.name}?`}
          accept={() => deleteImage(image.id)}
          cancelText="Peruuta"
          confirmText="Poista"
          cancel={() => setDeleting(false)}
        />
      )}
    </Fragment>
  );
};

export default ThumbnailImage;
