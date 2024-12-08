import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { StorageEditForm } from "../forms/StorageEditForm";
import { useCustomEvent } from "../../../../../utils/useCustomEvent";
import { StorageMaterialResponse } from "../../../../../services/storage/storageApi";

interface StorageEditModalProps {
  selectedMaterial: StorageMaterialResponse | null;
}

export const StorageEditModal = ({
  selectedMaterial,
}: StorageEditModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  useCustomEvent("storage:open-edit-modal", handleModalOpen);
  useCustomEvent("storage:close-edit-modal", handleModalClose);

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose} className="w-50">
      <div className="modal-container">
        <h1>
          Especificações <span>Material</span>
        </h1>
        {selectedMaterial && (
          <StorageEditForm selectedMaterial={selectedMaterial} />
        )}
      </div>
    </Modal>
  );
};
