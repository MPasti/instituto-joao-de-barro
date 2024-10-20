import { Dialog, DialogPanel} from "@headlessui/react";
import { FaX } from "react-icons/fa6";

interface IModal {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  clickableBackdrop?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  clickableBackdrop,
}: IModal): JSX.Element => {
  function handleClose() {
    onClose?.();
  }

  function handleBackdropClose() {
    if (clickableBackdrop) {
      handleClose();
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleBackdropClose}
      className="dialog"
    >
      <div className="container">
        <DialogPanel className="dialog-panel">
          <FaX
            size={22}
            onClick={handleClose}
          />
          
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
