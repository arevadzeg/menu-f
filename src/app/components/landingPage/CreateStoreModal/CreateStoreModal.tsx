import { useForm } from "react-hook-form";
import Modal from "../../ui/Modal/Modal";
import { useCreateStore } from "<root>/app/api/hooks/store/useStoreMutations";
import { Dispatch, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@radix-ui/themes";
import TextField from "../../ui/TextField/TextField";
import { SetStateAction } from "jotai";
import './createStoreModal.scss'
import FileUpload from "../../ui/Upload/Upload";
import useUploadFile from "<root>/app/api/hooks/upload/useUploadImage";

interface CreateStoreModalProps {
  isCreateStoreModal: boolean;
  setIsCreateStoreModal: Dispatch<SetStateAction<boolean>>;
}

const CreateStoreModal = ({
  isCreateStoreModal,
  setIsCreateStoreModal,
}: CreateStoreModalProps) => {
  const queryClient = useQueryClient();
  const [user] = useAtom(authAtom);
  const createStore = useCreateStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false)
  const uploadFile = useUploadFile();


  const onSubmit = async (data: any) => {
    try {
      setIsUploading(true);
      let imageUrl = "";

      if (selectedFile) {
        const uploadResponse = await uploadFile.mutateAsync({
          file: selectedFile,
        });
        imageUrl = uploadResponse.downloadURL;
      }

      if (user) {

        await createStore.mutateAsync(
          { ...data, userId: user.user.id, image: imageUrl },
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

      queryClient.invalidateQueries({ queryKey: ["products"] });

    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsUploading(false);
    }
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      facebook: "",
      instagram: "",
    },
  });


  return (
    <Modal
      isOpen={isCreateStoreModal}
      onClose={() => setIsCreateStoreModal(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <p>Create Store</p>


        <div className="create-store-form">

          {/* Store Name (required) */}
          <div>
            <TextField
              {...register("name", { required: "Store name is required" })}
              placeholder="Store Name"
            />
            {errors.name ? <p className="text-red-500">{errors.name.message}</p> : <p className="h-6 "></p>}
          </div>

          <div>
            <TextField
              {...register("address")}
              placeholder="Address"
            />
          </div>

          <div>
            <TextField
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email"
            />
            {errors.email ? <p className="text-red-500">{errors.email.message}</p> : <p className="h-6 "></p>}
          </div>


          <div>
            {/* Phone (optional, must be 10 digits) */}
            <TextField
              {...register("phone", {
                pattern: {
                  value: /^\d{9}$/, // Matches exactly 9 digits
                  message: "Enter a valid 9-digit phone number",
                },
              })}
              placeholder="Phone"
            />
            {errors.phone ? <p className="text-red-500">{errors.phone.message}</p> : <p className="h-6 "></p>}
          </div>


          <div>

            {/* Facebook (optional, valid URL) */}
            <TextField
              {...register("facebook", {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/,
                  message: "Enter a valid Facebook URL",
                },
              })}
              placeholder="Facebook"
            />
            {errors.facebook ? <p className="text-red-500">{errors.facebook.message}</p> : <p className="h-6 "></p>}
          </div>

          <div>

            <TextField
              {...register("instagram", {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/,
                  message: "Enter a valid Instagram URL",
                },
              })}
              placeholder="Instagram"
            />
            {errors.instagram ? <p className="text-red-500">{errors.instagram.message}</p> : <p className="h-6 "></p>}

          </div>

        </div>

        <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />


        <Button type="submit" loading={createStore.isPending}>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default CreateStoreModal;
