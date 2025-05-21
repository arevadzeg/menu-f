"use client";


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



interface CreateStoreFormProps {
    isCreateMode?: boolean,
    setIsCreateStoreModal?: Dispatch<SetStateAction<boolean>>;
}


const CreateStoreForm = ({ setIsCreateStoreModal, isCreateMode = false }: CreateStoreFormProps) => {
    const { data: store } = useGetStore();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [color, setColor] = useState(store?.theme ?? "#088F8F")
    const [user] = useAtom(authAtom);
    const queryClient = useQueryClient();
    const updateStore = useUpdateStore();
    const createStore = useCreateStore();
    const uploadFile = useUploadFile();


    const storeMutation = isCreateMode ? createStore : updateStore


    const onSubmit = async (data: any) => {
        try {
            let imageUrl = store?.image ?? "";

            if (selectedFile) {
                const uploadResponse = await uploadFile.mutateAsync({
                    file: selectedFile,
                });
                imageUrl = uploadResponse.downloadURL;
            }

            if (user) {

                console.log('imageUrl', imageUrl)

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
        } finally {
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

    return <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <p>{isCreateMode ? "Create Store" : "Update Store"}</p>


        <div className="create-store-form">

            {/* Store Name (required) */}
            <div>
                <TextField
                    {...register("name", { required: "Store name is required" })}
                    placeholder="Store Name"
                />
                {errors.name ? <p className="text-red-500">{errors.name.message}</p> : <p className="h-6 "></p>}
            </div>

            <div style={{
                minHeight: "56px"
            }}>
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

            <div>
                <p className="mb-1">Primary color</p>
                <ColorPicker color={color ?? "#088F8F"} onChange={(newColor) => {
                    setColor(newColor)
                }} />
            </div>
        </div>

        <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile}
            uploadedImage={store?.image && !isCreateMode ? store.image : undefined}
        />


        <Button type="submit" loading={storeMutation.isPending}>
            {isCreateMode ? "Create" : "Update"}
        </Button>
    </form>
}


export default CreateStoreForm