import { useState } from "react"
import { Modal } from "./Modal"
import { useCustomEvent } from "../../utils/useCustomEvent";
import { StorageRegisterForm } from "../forms/StorageRegisterForm";
import { ModalContainer } from "../../styles";

export const StorageRegisterModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    function handleModalOpen() {
        setIsModalOpen(true);
      }
    
      function handleModalClose() {
        setIsModalOpen(false);
      }
    
      useCustomEvent("storage:open-register-modal", handleModalOpen);


    return (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <ModalContainer>
            <h1>Novo Registro <span>Material</span></h1>
            <StorageRegisterForm />
          </ModalContainer>
         
        </Modal>
    )
}