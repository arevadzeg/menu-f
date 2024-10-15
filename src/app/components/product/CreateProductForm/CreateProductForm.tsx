import { useForm } from "react-hook-form";
import "./CreateProductForm.scss";
import { Button } from "../../ui/Button/Button";
import TextField from "../../ui/TextField/TextField";
import FileUpload from "../../ui/Upload/Upload";
import useCreateProduct, {
  useUpdateProduct,
} from "<root>/app/api/useCreateProduct";
import { ChangeEvent, useState } from "react";
import useUploadFile from "<root>/app/api/useUploadImage";
import { useQueryClient } from "@tanstack/react-query";
import Backdrop from "../../ui/Backdrop/Backdrop";
import { Product } from "<root>/app/api/useGetProducts";
import RichTextEditor from "../../ui/RichTextEditor/RichTextEditor";
import RadixButton from "../../ui/RadixButton/RadixButton";

interface CreateProductFormProps {
  isUpdateMode?: boolean;
  productData?: Product;
  closeModal?: () => void;
}
const CreateProductForm = ({
  isUpdateMode,
  productData,
  closeModal,
}: CreateProductFormProps) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      title: productData?.title,
      price: productData?.price,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadFile = useUploadFile();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const [richTextEditorValue, setRichTextEditorValue] = useState(
    productData?.description ?? ""
  );

  const mutation = isUpdateMode ? updateProduct : createProduct;
  const queryClient = useQueryClient();

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: "title" | "price"
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

      await mutation.mutateAsync({
        image: imageUrl,
        price: Number(data.price),
        title: data.title,
        productId: productData?.id ?? "",
        description: richTextEditorValue,
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });

      if (isUpdateMode) {
        closeModal && closeModal();
      } else {
        setSelectedFile(null);
        reset();
      }
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <span>
      {isUploading && <Backdrop open />}

      <form onSubmit={handleSubmit(onSubmit)} className="create-product-form">
        <div className="form-body">
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
            uploadedImage={productData?.image}
          />
          <RichTextEditor
            value={richTextEditorValue}
            onChange={(e: string) => setRichTextEditorValue(e)}
          />
        </div>

        <RadixButton type="submit" className="button">
          {isUploading
            ? isUpdateMode
              ? "Updating..."
              : "Creating..."
            : isUpdateMode
            ? "Update Product"
            : "Create Product"}
        </RadixButton>
      </form>
    </span>
  );
};

export default CreateProductForm;
