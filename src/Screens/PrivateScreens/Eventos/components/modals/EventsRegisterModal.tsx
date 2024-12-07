import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { EventRegisterForm } from "../forms/EventRegisterForm";
import { useCustomEvent } from "../../../../../utils/useCustomEvent";

export const EventsRegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }
  
  function handleModalClose() {
    setIsModalOpen(false);
  }
  
  useCustomEvent("events:open-register-modal", handleModalOpen);
  useCustomEvent("events:close-register-modal", handleModalClose);

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <div className="modal-container">
        <h1>Novo Evento <span>Evento</span></h1>
        <EventRegisterForm handleCancel={handleModalClose} />
      </div>
    </Modal>
  );
};
