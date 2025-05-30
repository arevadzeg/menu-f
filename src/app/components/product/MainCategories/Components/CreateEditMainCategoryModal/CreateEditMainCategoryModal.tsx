import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "<root>/app/api/hooks/category/useCategoryMutations";
import useGetCategories from "<root>/app/api/hooks/category/useGetCategories";
import Modal from "<root>/app/components/ui/Modal/Modal";
import RadixButton from "<root>/app/components/ui/RadixButton/RadixButton";
import TextField from "<root>/app/components/ui/TextField/TextField";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Backdrop from "<root>/app/components/ui/Backdrop/Backdrop";

interface CreateEditMainCategoryModalProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
}

const CreateEditMainCategoryModal = ({
  handleCloseModal,
  isModalOpen,
}: CreateEditMainCategoryModalProps) => {
  const [isAddNewCategory, setIsAddNewCategory] = useState<
    "Create" | "Edit" | null
  >(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryToUpdateId, setCategoryToUpdateId] = useState<string | null>(
    null,
  );

  const { data: categories } = useGetCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const isCreateUpdateLoading =
    isAddNewCategory === "Create"
      ? createCategory.isPending
      : updateCategory.isPending;

  const handleCreateCategory = () => {
    createCategory.mutate(
      { categoryName: newCategoryName },
      {
        onSuccess: closeModalAndClearData,
      },
    );
  };

  const handleUpdateCategory = (categoryToUpdateId: string) => {
    updateCategory.mutate(
      {
        categoryName: newCategoryName,
        categoryId: categoryToUpdateId,
      },
      {
        onSuccess: closeModalAndClearData,
      },
    );
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory.mutate(
      {
        categoryId: id,
      },
      {
        onSuccess: closeModalAndClearData,
      },
    );
  };

  const closeModalAndClearData = () => {
    setNewCategoryName("");
    setIsAddNewCategory(null);
    setCategoryToUpdateId(null);
  };

  const handleEditCategory = (name: string, id: string) => {
    setIsAddNewCategory("Edit");
    setNewCategoryName(name);
    setCategoryToUpdateId(id);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Edit Categories</h2>
        {deleteCategory.isPending && <Backdrop open />}

        <RadixButton
          onClick={() => {
            setIsAddNewCategory((prev) => (!!prev ? null : "Create"));
          }}
          className="mb-4"
        >
          {isAddNewCategory ? "Back" : "Add New Category"}
        </RadixButton>

        {isAddNewCategory ? (
          <div>
            <TextField
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mb-2"
            />
            <RadixButton
              onClick={() => {
                if (isAddNewCategory === "Create") handleCreateCategory();
                else
                  categoryToUpdateId &&
                    handleUpdateCategory(categoryToUpdateId);
              }}
              loading={isCreateUpdateLoading}
            >
              Create category
            </RadixButton>
          </div>
        ) : (
          <div className="overflow-auto max-h-[50vh]">
            {categories &&
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm mb-2 hover:bg-gray-50 transition duration-200"
                >
                  <span className="text-primaryText">{category.name}</span>
                  <div className="flex gap-2">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <TrashIcon />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleEditCategory(category.name, category.id)
                      }
                    >
                      <Pencil1Icon />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateEditMainCategoryModal;
