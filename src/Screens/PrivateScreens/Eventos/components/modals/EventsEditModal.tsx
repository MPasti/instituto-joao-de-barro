import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { EventsEditForm } from "../forms/EventsEditForm"; // Certifique-se de importar o formulário de edição
import { useCustomEvent } from "../../../../../utils/useCustomEvent";
import { Event } from "../../../../../services/storage/eventsApi"; // Importe o tipo de evento

interface IEventEditModalProps {
  selectedEvent: Event; // Recebe o evento selecionado para edição
}

export const EventsEditModal = ({ selectedEvent }: IEventEditModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  useCustomEvent("events:open-edit-modal", handleModalOpen); // Evento para abrir o modal de edição
  useCustomEvent("events:close-edit-modal", handleModalClose); // Evento para fechar o modal de edição

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <div className="modal-container">
        <h1>Editar Evento <span>{selectedEvent.name}</span></h1>
        <EventsEditForm 
          selectedEvent={selectedEvent} // Passando o evento selecionado para o formulário de edição
          handleCancel={handleModalClose} 
        />
      </div>
    </Modal>
  );
};
