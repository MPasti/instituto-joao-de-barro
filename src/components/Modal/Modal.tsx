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
  clickableBackdrop = true,
  className = "",
}: IModal): JSX.Element => {
  function handleClose() {
    onClose?.();
  }

  function handleBackdropClose(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (clickableBackdrop && event.target === event.currentTarget) {
      handleClose();
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className="dialog">
      <div className="container backdrop" onClick={handleBackdropClose}>
        <DialogPanel className={`dialog-panel ${className}`}>
          <FaX size={24} onClick={handleClose} className="close-icon me-2" />
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
