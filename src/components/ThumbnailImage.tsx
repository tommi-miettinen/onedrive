import { useState, Fragment } from "react";
import { deleteImage } from "../store/imageStore";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface ThumbnailProps {
  url: string;
  name: string;
  id: string;
  onClick: ({ url, name, id }: { url: string; name: string; id: string }) => void;
}

const ThumbnailImage = ({ url, name, id, onClick }: ThumbnailProps) => {
  const [imageUrl, setImageUrl] = useState(url);
  const [deleting, setDeleting] = useState(false);

  return (
    <Fragment>
      <div className="max-w-[240px] w-full relative border rounded overflow-clip">
        <img
          onClick={() => onClick({ url, name, id })}
          className="w-full h-[150px] hover:opacity-80 object-cover cursor-pointer"
          src={imageUrl}
          onError={() => setImageUrl(url)}
        />
        <div className="flex justify-between items-center bg-white p-2">
          <span className="truncate text-sm">{name}</span>
          <button
            className="rounded color-white p-2 w-min border hover:bg-neutral-100"
            onClick={(e) => {
              e.stopPropagation();
              setDeleting(true);
            }}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <DeleteConfirmationModal
        visible={deleting}
        message={`Poistetaanko ${name}?`}
        accept={() => deleteImage(id)}
        cancelText="Peruuta"
        confirmText="Poista"
        cancel={() => setDeleting(false)}
      />
    </Fragment>
  );
};

export default ThumbnailImage;
