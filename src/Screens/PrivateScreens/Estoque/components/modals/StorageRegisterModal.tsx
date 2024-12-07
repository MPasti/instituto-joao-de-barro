import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { StorageRegisterForm } from "../forms/StorageRegisterForm";
import { useCustomEvent } from "../../../../../utils/useCustomEvent";

export const StorageRegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  useCustomEvent("storage:open-register-modal", handleModalOpen);
  useCustomEvent("storage:close-register-modal", handleModalClose);

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose} className="w-50">
      <div className="modal-container">
        <h1>
          Novo Registro <span>Material</span>
        </h1>
        <StorageRegisterForm handleCancel={handleModalClose} />
      </div>
    </Modal>
  );
};
