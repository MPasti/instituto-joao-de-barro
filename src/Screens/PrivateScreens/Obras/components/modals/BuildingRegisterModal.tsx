import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { BuildingRegisterForm } from "../forms/BuildingRegisterForm";  // Formulário de criação de construção
import { useCustomEvent } from "../../../../../utils/useCustomEvent";

export const BuildingRegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  useCustomEvent("building:open-register-modal", handleModalOpen);
  useCustomEvent("building:close-register-modal", handleModalClose);

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <div className="modal-container">
        <h1>
          Novo Registro <span>Construção</span>
        </h1>
        <BuildingRegisterForm handleCancel={handleModalClose} />
      </div>
    </Modal>
  );
};
