import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { useCustomEvent } from "../../../../../utils/useCustomEvent";
import { OutletEditForm } from "../forms/OutletEditForm";

export const OutletEditModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  useCustomEvent("outlet:open-edit-modal", handleModalOpen);
  useCustomEvent("outlet:close-edit-modal", handleModalClose);

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose} className="w-50">
      <div className="modal-container">
        <h1>
          Especificações <span>Produto</span>
        </h1>
        <OutletEditForm />
      </div>
    </Modal>
  );
};
