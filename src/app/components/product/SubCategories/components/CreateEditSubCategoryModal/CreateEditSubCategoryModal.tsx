import {
  useCreateSubCategory,
  useDeleteSubCategory,
  useUpdateSubCategory,
} from '<root>/app/api/hooks/category/useCategoryMutations';
import useGetCategories from '<root>/app/api/hooks/category/useGetCategories';
import Backdrop from '<root>/app/components/ui/Backdrop/Backdrop';
import Modal from '<root>/app/components/ui/Modal/Modal';
import RadixButton from '<root>/app/components/ui/RadixButton/RadixButton';
import TextField from '<root>/app/components/ui/TextField/TextField';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface CreateEditSubCategoryModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

// TODO HARD CORED COLORS

function CreateEditSubCategoryModal({
  isModalOpen,
  handleCloseModal,
}: CreateEditSubCategoryModalProps) {
  const { categoryId } = useParams();

  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [subCategoryToUpdateId, setSubCategoryToUpdateId] = useState<
  string | null
  >(null);
  const [isAddNewSubCategory, setIsAddNewSubCategory] = useState<
  'Create' | 'Edit' | null
  >(null);

  const { data: categories } = useGetCategories();
  const createSubCategory = useCreateSubCategory();
  const updateSubCategory = useUpdateSubCategory();
  const deleteSubCategory = useDeleteSubCategory();

  const category = categories?.find((cat) => cat.id === categoryId);

  const handleEditSubCategory = (name: string, id: string) => {
    setIsAddNewSubCategory('Edit');
    setNewSubCategoryName(name);
    setSubCategoryToUpdateId(id);
  };

  const closeModalAndClearData = () => {
    setNewSubCategoryName('');
    handleCloseModal();
    setSubCategoryToUpdateId(null);
  };

  const handleDeleteCategory = (id: string) => {
    deleteSubCategory.mutate(
      {
        categoryId: id,
      },
      {
        onSuccess: closeModalAndClearData,
      },
    );
  };

  const handleCreateOrUpdateSubCategory = () => {
    if (isAddNewSubCategory === 'Create') {
      createSubCategory.mutate(
        { subCategoryName: newSubCategoryName, categoryId: category?.id ?? '' },
        { onSuccess: closeModalAndClearData },
      );
    } else if (subCategoryToUpdateId) {
      updateSubCategory.mutate(
        {
          subCategoryName: newSubCategoryName,
          subCategoryId: subCategoryToUpdateId,
        },
        { onSuccess: closeModalAndClearData },
      );
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModalAndClearData}>
      <>
        {deleteSubCategory.isPending && <Backdrop open />}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit Subcategories</h2>
          <RadixButton
            onClick={() => setIsAddNewSubCategory((prev) => (prev ? null : 'Create'))}
            className="mb-4"
          >
            {isAddNewSubCategory ? 'Back' : 'Add New Subcategory'}
          </RadixButton>

          {isAddNewSubCategory && (
            <div>
              <TextField
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e.target.value)}
                className="mb-2"
              />
              <RadixButton onClick={handleCreateOrUpdateSubCategory}>
                {isAddNewSubCategory === 'Create'
                  ? 'Create Subcategory'
                  : 'Update Subcategory'}
              </RadixButton>
            </div>
          )}

          {!isAddNewSubCategory
            && category?.subCategories?.map((subCategory) => (
              <div
                key={subCategory.id}
                className="flex justify-between items-center p-2  rounded-lg shadow-sm mb-2  transition duration-200"
              >
                <span className="text-gray-800">{subCategory.name}</span>
                <div className="flex gap-2">
                  <div
                    className="cursor-pointer delete-product"
                    onClick={() => handleDeleteCategory(subCategory.id)}
                  >
                    <TrashIcon />
                  </div>
                  <div
                    className="cursor-pointer edit-product"
                    onClick={() => handleEditSubCategory(subCategory.name, subCategory.id)}
                  >
                    <Pencil1Icon />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    </Modal>
  );
}

export default CreateEditSubCategoryModal;
