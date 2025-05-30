import { useForm } from "react-hook-form";
import { useCreateStore, useUpdateStore } from "<root>/app/api/hooks/store/useStoreMutations";
import { Dispatch, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@radix-ui/themes";
import TextField from "../../ui/TextField/TextField";
import { SetStateAction } from "jotai";
import FileUpload from "../../ui/Upload/Upload";
import useUploadFile from "<root>/app/api/hooks/upload/useUploadImage";
import { useGetStore } from "<root>/app/api/hooks/store/useGetStore";
import ColorPicker from "../../ui/ColorPicker/ColorPicker";
import { DEFAULT_THEME_COLOR } from "<root>/app/constants/constants";
import { emailPattern, facebookPattern, instagramPattern, phonePattern } from "./storeFormValidation";

interface CreateStoreFormProps {
    isCreateMode?: boolean,
    setIsCreateStoreModal?: Dispatch<SetStateAction<boolean>>;
}

const CreateStoreForm = ({ setIsCreateStoreModal, isCreateMode = false }: CreateStoreFormProps) => {
    const { data: store } = useGetStore();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [color, setColor] = useState(store?.theme ?? DEFAULT_THEME_COLOR)
    const [user] = useAtom(authAtom);
    const queryClient = useQueryClient();
    const updateStore = useUpdateStore();
    const createStore = useCreateStore();
    const uploadFile = useUploadFile();

    const storeMutation = isCreateMode ? createStore : updateStore;

    const handleFormSubmit = async (data: any) => {
        try {
            let imageUrl = store?.image ?? "";

            if (selectedFile) {
                const uploadResponse = await uploadFile.mutateAsync({
                    file: selectedFile,
                });
                imageUrl = uploadResponse.downloadURL;
            }

            if (user) {
                await storeMutation.mutateAsync(
                    { ...data, userId: user.user.id, image: imageUrl, theme: color },
                    {
                        onSuccess: () => {
                            setIsCreateStoreModal && setIsCreateStoreModal(false);
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
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: store?.name ?? "",
            address: store?.address ?? "",
            email: store?.email ?? "",
            phone: store?.phone ?? "",
            facebook: store?.facebook ?? "",
            instagram: store?.instagram ?? "",
        },
    });

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4" id="create-edit-store-form">
            <p className="font-bold text-center text-xl mb-4 text-primaryText">
                {isCreateMode ? "Create Store" : "Update Store"}
            </p>

            <div className="create-store-form">
                <FormField name="name" label="Store Name" register={register("name", { required: "Store name is required" })} error={errors.name} />
                <FormField name="address" label="Address" register={register("address")} />
                <FormField name="email" label="Email" register={register("email", { pattern: emailPattern })} error={errors.email} />
                <FormField name="phone" label="Phone" register={register("phone", { pattern: phonePattern })} error={errors.phone} />
                <FormField name="facebook" label="Facebook" register={register("facebook", { pattern: facebookPattern })} error={errors.facebook} />
                <FormField name="instagram" label="Instagram" register={register("instagram", { pattern: instagramPattern })} error={errors.instagram} />

                <div>
                    <p className="mb-1 text-primaryText">Primary color</p>
                    <ColorPicker color={color} onChange={setColor} />
                </div>
            </div>

            <FileUpload
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                uploadedImage={!isCreateMode && store?.image ? store.image : undefined}
            />

            <Button type="submit" loading={storeMutation.isPending}>
                {isCreateMode ? "Create" : "Update"}
            </Button>
        </form>
    );
};

const FormField = ({ label, register, error }: any) => (
    <div>
        <TextField {...register} placeholder={label} />
        <p className="text-red-500 h-6">{error?.message || ""}</p>
    </div>
);

export default CreateStoreForm;
