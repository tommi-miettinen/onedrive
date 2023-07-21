import { ResponsiveModal } from "./Modal";

interface DeleteConfirmationModalProps {
  visible: boolean;
  cancel: () => void;
  accept: () => void;
  confirmText: string;
  cancelText: string;
  message: string;
}

const DeleteConfirmationModal = ({ cancel, accept, confirmText, cancelText, message, visible }: DeleteConfirmationModalProps) => {
  return (
    <ResponsiveModal isOpen={visible} dismiss={cancel}>
      <div className="z-10 flex sm:min-w-[500px] sm:max-w-[500px] rounded-md bg-white overflow-clip p-8">
        <div className="flex w-full flex-col bg-white items-center justify-center">
          <button
            onClick={cancel}
            type="button"
            className="absolute top-3 right-2.5  bg-transparent hover:bg-gray-200  rounded-md text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="p-2 text-center">
            <p className="mb-4 text-sm">{message}</p>
            <button
              onClick={accept}
              type="button"
              className="text-white  bg-black hover:bg-opacity-90 rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              {confirmText}
            </button>
            <button
              onClick={cancel}
              type="button"
              className=" bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-md border border-gray-200 text-sm px-5 py-2.5"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
};

export default DeleteConfirmationModal;
