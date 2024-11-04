import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { EventsEditForm } from "../forms/EventsEditForm";
import { useCustomEvent } from "../../../../../utils/useCustomEvent";
import { StorageMaterial } from "../../../../../services/storage/storageApi";

interface StorageEditModalProps {
    selectedMaterial: StorageMaterial | null;
}

export const EventsEditModal = ({ selectedMaterial }: StorageEditModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }

    useCustomEvent("storage:open-edit-modal", handleModalOpen);
    useCustomEvent("storage:close-edit-modal", handleModalClose)

    return (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="modal-container">
                <h1>Especificações <span>Evento</span></h1>
                {selectedMaterial && (
                    <EventsEditForm selectedMaterial={selectedMaterial} />
                )}
            </div>
        </Modal>
    );
};
