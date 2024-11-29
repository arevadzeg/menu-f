import Modal from "../../ui/Modal/Modal";
import { useCreateStore } from "<root>/app/api/hooks/store/useStoreMutations";
import { Dispatch, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@radix-ui/themes";
import TextField from "../../ui/TextField/TextField";
import { SetStateAction } from "jotai";

interface CreateStoreModalProps {
  isCreateStoreModal: boolean;
  setIsCreateStoreModal: Dispatch<SetStateAction<boolean>>;
}

const CreateStoreModal = ({
  isCreateStoreModal,
  setIsCreateStoreModal,
}: CreateStoreModalProps) => {
  const [storeName, setStoreName] = useState("");
  const queryClient = useQueryClient();

  const [user] = useAtom(authAtom);

  const createStore = useCreateStore();
  const handleCreateStore = async () => {
    if (user) {
      await createStore.mutateAsync(
        { name: storeName, userId: user.user.id },
        {
          onSuccess: () => {
            setIsCreateStoreModal(false);
            queryClient.invalidateQueries({
              queryKey: ["store", user.user.id],
            });
          },
        }
      );
    }
  };

  return (
    <Modal
      isOpen={isCreateStoreModal}
      onClose={() => setIsCreateStoreModal(false)}
    >
      <div className="p-6 space-y-4">
        <p>Create Store</p>
        <TextField
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Store Name"
        />
        <Button onClick={handleCreateStore} loading={createStore.isPending}>
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CreateStoreModal;
