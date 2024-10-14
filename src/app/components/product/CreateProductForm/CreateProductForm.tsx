import { useForm } from "react-hook-form";
import "./CreateProductForm.scss";
import { Button } from "../../ui/Button/Button";
import TextField from "../../ui/TextField/TextField";
import FileUpload from "../../ui/Upload/Upload";
import useCreateProduct from "<root>/app/api/useCreateProduct";
import { ChangeEvent, useState } from "react";
import useUploadFile from "<root>/app/api/useUploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Backdrop from "../../ui/Backdrop/Backdrop";

const CreateProductForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadFile = useUploadFile();
  const createProduct = useCreateProduct();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = event.target.value;
    setValue(name, value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (isNaN(value)) return;
    setValue("price", value);
  };

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

      await createProduct.mutateAsync({
        image: imageUrl,
        price: Number(data.price),
        title: data.title,
      });

      const storeId = "3a1a255b-c22e-4ddf-90e5-94c8e21e8790";
      const search = searchParams.get("search") || "";
      const sort = searchParams.get("sort") || "";
      const order = searchParams.get("order") || "";

      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsUploading(false); // Hide spinner after upload completes
    }
  };

  return (
    <span>
      {isUploading && <Backdrop open />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <TextField
          placeholder="Title"
          {...register("title", { required: true })}
          onChange={(e) => handleFieldChange(e, "title")}
        />

        <TextField
          placeholder="Price"
          {...register("price", { required: true })}
          onChange={handlePriceChange}
        />

        <FileUpload
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />

        <Button type="submit">
          {isUploading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </span>
  );
};

export default CreateProductForm;
