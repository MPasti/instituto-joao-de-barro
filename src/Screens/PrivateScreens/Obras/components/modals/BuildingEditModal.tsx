import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { BuildingEditForm } from "../forms/BuildingEditForm";  // Formulário de edição da construção
import { useCustomEvent } from "../../../../../utils/useCustomEvent";
import { Building } from "../../../../../services/buildings/buildingApi"; 

interface BuildingEditModalProps {
  selectedBuilding: Building | null;  
}

export const RefreshPage = () => {
 
    window.location.reload();
 

};

export const BuildingEditModal = ({ selectedBuilding }: BuildingEditModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
    window.location.reload(); // Atualiza a página após fechar o modal
  }

  // Usando os eventos customizados para controlar a abertura e fechamento do modal
  useCustomEvent("building:open-edit-modal", handleModalOpen);
  useCustomEvent("building:close-edit-modal", handleModalClose);

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <div className="modal-container">
        <h1>Especificações <span>Construção</span></h1>
        {selectedBuilding && (
          <BuildingEditForm selectedBuilding={selectedBuilding} />
        )}
      </div>
    </Modal>
  );
};
