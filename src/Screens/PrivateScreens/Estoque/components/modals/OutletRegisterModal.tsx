import { useState } from "react";
import { Modal } from "../../../../../components/Modal/Modal";
import { useCustomEvent } from "../../../../../utils/useCustomEvent";
import { OutletRegisterForm } from "../forms/OutletRegisterForm";

export const OutletRegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  useCustomEvent("outlet:open-register-modal", handleModalOpen);
  useCustomEvent("outlet:close-register-modal", handleModalClose);

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose} className="w-50">
      <div className="modal-container">
        <h1>
          Novo Registro <span>Outlet</span>
        </h1>
        <OutletRegisterForm handleCancel={handleModalClose} />
      </div>
    </Modal>
  );
};
