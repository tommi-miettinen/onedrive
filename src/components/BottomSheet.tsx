import Sheet from "react-modal-sheet";

const BottomSheet = ({ isOpen, dismiss, children }: { isOpen: boolean; dismiss: () => void; children: JSX.Element | JSX.Element[] }) => {
  return (
    <Sheet detent="content-height" isOpen={isOpen} onClose={dismiss} onCloseEnd={dismiss}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Scroller>{children}</Sheet.Scroller>
      </Sheet.Container>
      <Sheet.Backdrop onTap={dismiss} />
    </Sheet>
  );
};

export default BottomSheet;
