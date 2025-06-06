import { useForm } from 'react-hook-form';
import {
  useUpdateProduct,
  useCreateProduct,
} from '<root>/app/api/hooks/product/useProductMutations';
import { ChangeEvent, useEffect, useState } from 'react';
import useUploadFile from '<root>/app/api/hooks/upload/useUploadImage';
import { useQueryClient } from '@tanstack/react-query';
import { Product } from '<root>/app/api/hooks/product/InterfaceProduct';
import useGetScrapeProductFromAnotherSite from '<root>/app/api/hooks/scrape/useGetScrapeProductFromAnotherSite';
import Backdrop from '../../ui/Backdrop/Backdrop';
// import RichTextEditor from '../../ui/RichTextEditor/RichTextEditor';
import RadixButton from '../../ui/RadixButton/RadixButton';
import FileUpload from '../../ui/Upload/Upload';
import TextField from '../../ui/TextField/TextField';

interface CreateProductFormProps {
  isUpdateMode?: boolean;
  productData?: Product;
  closeModal?: () => void;
}
function CreateProductForm({
  isUpdateMode,
  productData,
  closeModal,
}: CreateProductFormProps) {
  const {
    register, handleSubmit, setValue, reset,
  } = useForm({
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
  const [richTextEditorValue] = useState(
    productData?.description ?? '',
  );

  const mutation = isUpdateMode ? updateProduct : createProduct;
  const queryClient = useQueryClient();

  const [url, setUrl] = useState('');

  const { refetch, data: scrapedData } = useGetScrapeProductFromAnotherSite({
    url,
  });

  useEffect(() => {
    if (scrapedData) {
      setValue('title', scrapedData.title);
      setValue('price', scrapedData.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrapedData]);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: 'title' | 'price',
  ) => {
    const { value } = event.target;
    setValue(name, value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) return;
    setValue('price', value);
  };

  let buttonText = '';

  if (isUploading) {
    buttonText = isUpdateMode ? 'Updating...' : 'Creating...';
  } else {
    buttonText = isUpdateMode ? 'Update Product' : 'Create Product';
  }

  const onSubmit = async (data: any) => {
    try {
      setIsUploading(true);
      let imageUrl = '';

      if (selectedFile) {
        const uploadResponse = await uploadFile.mutateAsync({
          file: selectedFile,
        });
        imageUrl = uploadResponse.downloadURL;
      }

      const image = imageUrl || (scrapedData?.image ?? '');

      await mutation.mutateAsync({
        image,
        price: Number(data.price),
        title: data.title,
        id: productData?.id ?? '',
        description: richTextEditorValue,
      });

      queryClient.invalidateQueries({ queryKey: ['products'] });

      if (isUpdateMode) {
        closeModal && closeModal();
      } else {
        setSelectedFile(null);
        reset();
      }
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <span>
      {isUploading && <Backdrop open />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pr-2"
      >
        <div className="overflow-auto flex flex-col gap-4 p-1 pr-2 max-h-[calc(85vh-150px)]">
          <div className="flex gap-2">
            <TextField
              placeholder="URL"
              className="flex-grow"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <RadixButton onClick={() => refetch()}>Steal Product</RadixButton>
          </div>
          <TextField
            placeholder="Title"
            {...register('title', { required: true })}
            onChange={(e) => handleFieldChange(e, 'title')}
          />
          <TextField
            placeholder="Price"
            {...register('price', { required: true })}
            onChange={handlePriceChange}
          />
          <FileUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            uploadedImage={productData?.image || scrapedData?.image}
          />
          {/* // TODO FIX RICH TEXT EDITOR */}
          {/* <RichTextEditor
            value={richTextEditorValue}
            onChange={(e: string) => setRichTextEditorValue(e)}
          /> */}
        </div>

        <RadixButton type="submit" className="mt-4">
          {buttonText}
        </RadixButton>
      </form>
    </span>
  );
}

export default CreateProductForm;
