import ReactDOM from "react-dom";
import BottomSheet from "./BottomSheet";
import useWindowSize from "../hooks/useWindowSize";

interface ModalProps {
  dismiss: () => void;
  isOpen: boolean;
  children: JSX.Element | JSX.Element[];
}

const Modal = ({ children, isOpen, dismiss }: ModalProps) => {
  const handleBgClick = (e: any) => {
    if (e.target.id === "bg") dismiss();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="z-10 fixed top-0 left-0 w-screen min-h-screen bg-black bg-opacity-25" />
      <div
        id="bg"
        onClick={handleBgClick}
        className="z-20 flex py-16 flex-col items-center fixed top-0 left-0 w-full h-full overflow-x-hidden outline-none"
      >
        <div className="z-30 relative m-auto flex flex-col mx-auto max-w-full items-center justify-center overflow-clip">{children}</div>
      </div>
    </>,
    document.body
  );
};

export default Modal;

export const ResponsiveModal = ({ isOpen, children, dismiss }: ModalProps) => {
  const windowSize = useWindowSize();

  return windowSize.width < 640 ? (
    <BottomSheet isOpen={isOpen} dismiss={dismiss}>
      {children}
    </BottomSheet>
  ) : (
    <Modal isOpen={isOpen} dismiss={dismiss}>
      {children}
    </Modal>
  );
};
