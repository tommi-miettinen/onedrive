import Spinner from "./Spinner";
import Modal from "./Modal";

interface LoadingModalProps {
  message?: string;
}

const LoadingModal = ({ message }: LoadingModalProps) => {
  return (
    <Modal id="loading" isVisible={true} toggle={() => {}}>
      <div className="min-w-[400px] min-h-[200px] flex flex-col p-12 items-center justify-evenly">
        <Spinner />
        <p>{message}</p>
      </div>
    </Modal>
  );
};

export default LoadingModal;
