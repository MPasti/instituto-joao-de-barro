import { Dialog, DialogPanel } from "@headlessui/react";
import { FaX } from "react-icons/fa6";

interface IModal {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  clickableBackdrop?: boolean;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  clickableBackdrop,
  className = "",
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
    <Dialog open={isOpen} onClose={handleBackdropClose} className="dialog">
      <div className="container">
        <DialogPanel className={`dialog-panel ${className}`}>
          <FaX size={24} onClick={handleClose} className="close-icon me-1" />
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
