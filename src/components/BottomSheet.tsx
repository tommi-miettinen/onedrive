import Sheet from "react-modal-sheet";
import FocusTrap from "focus-trap-react";

interface BottomSheetProps {
  isOpen: boolean;
  dismiss: () => void;
  children: JSX.Element | JSX.Element[];
}

const BottomSheet = ({ isOpen, dismiss, children }: BottomSheetProps) => {
  return (
    <Sheet detent="content-height" isOpen={isOpen} onClose={dismiss} onCloseEnd={dismiss}>
      <FocusTrap>
        <div>
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Scroller>{children}</Sheet.Scroller>
          </Sheet.Container>
          <Sheet.Backdrop onTap={dismiss} />
        </div>
      </FocusTrap>
    </Sheet>
  );
};

export default BottomSheet;
