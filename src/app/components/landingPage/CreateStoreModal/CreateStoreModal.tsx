import Modal from "../../ui/Modal/Modal";
import { Dispatch } from "react";
import { SetStateAction } from "jotai";
import "./createStoreModal.scss";
import CreateStoreForm from "../../product/CreateStoreForm/CreateStoreForm";

interface CreateStoreModalProps {
  isCreateStoreModal: boolean;
  setIsCreateStoreModal: Dispatch<SetStateAction<boolean>>;
}

const CreateStoreModal = ({
  isCreateStoreModal,
  setIsCreateStoreModal,
}: CreateStoreModalProps) => {
  return (
    <Modal
      isOpen={isCreateStoreModal}
      onClose={() => setIsCreateStoreModal(false)}
      contentClassName="overflow-auto"
    >
      <CreateStoreForm
        setIsCreateStoreModal={setIsCreateStoreModal}
        isCreateMode
      />
    </Modal>
  );
};

export default CreateStoreModal;
