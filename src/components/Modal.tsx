import ReactDOM from "react-dom";

interface ModalProps {
  bgDisabled?: boolean;
  elevation?: number;
  id: string;
  isVisible: boolean;
  toggle: () => void;
  children: JSX.Element | JSX.Element[];
}

const Modal = ({ isVisible, children, toggle, id, elevation }: ModalProps) => {
  const handleBgClick = (e: any) => {
    if (e.target.id === id) toggle();
  };

  return isVisible
    ? ReactDOM.createPortal(
        <>
          <div
            style={{ zIndex: elevation ? 10 * elevation : 10 }}
            className="fixed top-0 left-0 w-screen min-h-screen bg-black bg-opacity-25"
          />
          <div
            id={id}
            style={{ zIndex: elevation ? 30 * elevation : 20 }}
            onClick={handleBgClick}
            className="flex py-16 flex-col items-center fixed top-0 left-0 w-full h-full overflow-x-hidden outline-none"
          >
            <div
              style={{ zIndex: elevation ? 30 * elevation : 30 }}
              className="relative m-auto bg-white mx-auto max-w-full flex items-center justify-center rounded-xl"
            >
              {children}
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};

export default Modal;
