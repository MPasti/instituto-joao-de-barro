import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { BuildingRegisterForm } from "../forms/BuildingRegisterForm";  // Formulário de criação de construção
import { useCustomEvent } from "../../../../../utils/useCustomEvent";

export const BuildingRegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Função para abrir o modal
  function handleModalOpen() {
    setIsModalOpen(true);
  }

  // Função para fechar o modal
  function handleModalClose() {
    setIsModalOpen(false);
  }

  // Usando os eventos customizados para abrir e fechar o modal
  useCustomEvent("building:open-register-modal", handleModalOpen);
  useCustomEvent("building:close-register-modal", handleModalClose);

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <div className="modal-container">
        <h1>Novo Registro <span>Construção</span></h1>
        {/* Passando a função handleCancel para o formulário para fechar o modal quando necessário */}
        <BuildingRegisterForm handleCancel={handleModalClose} />
      </div>
    </Modal>
  );
};
