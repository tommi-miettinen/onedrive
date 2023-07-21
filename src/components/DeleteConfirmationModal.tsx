import Modal from "./Modal";

const DeleteConfirmationModal = ({
  cancel,
  accept,
  confirmText,
  cancelText,
  message,
}: {
  cancel: () => void;
  accept: () => void;
  confirmText: string;
  cancelText: string;
  message: string;
}) => {
  return (
    <Modal id="delete-confirmation-modal" isVisible={true} toggle={cancel}>
      <div className="flex min-w-[500px] max-w-[500px] rounded-xl overflow-clip p-8">
        <div className="flex flex-col bg-white w-full items-center justify-center">
          <button
            onClick={cancel}
            type="button"
            className="absolute top-3 right-2.5  bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <p className="mb-4">{message}</p>
            <button
              onClick={accept}
              type="button"
              className="text-white  bg-black hover:bg-opacity-90 rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              {confirmText}
            </button>
            <button
              onClick={cancel}
              type="button"
              className=" bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
