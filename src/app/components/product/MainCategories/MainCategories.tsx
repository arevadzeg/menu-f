"use client"; // Add this line
import { useParams, useRouter } from "next/navigation";
import "./MainCategories.scss"; // You can keep this for additional custom styles
import { useState } from "react";
import {
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import RadixButton from "../../ui/RadixButton/RadixButton";
import useGetCategories from "<root>/app/api/hooks/category/useGetCategories";
import TextField from "../../ui/TextField/TextField";
import Modal from "../../ui/Modal/Modal";
import { Spinner } from "@radix-ui/themes";
import {
  useCreateCategory,
  useUpdateCategory,
} from "<root>/app/api/hooks/category/useCategoryMutations";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";

const MainCategories = () => {
  const router = useRouter();
  const { appName, categoryId } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    !!categoryId ? String(categoryId) : null
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryToUpdateId, setCategoryToUpdateId] = useState<string | null>(
    null
  );
  const [isAddNewCategory, setIsAddNewCategory] = useState<
    "Create" | "Edit" | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories } = useGetCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [user] = useAtom(authAtom);
  const isAdmin = !!user;
  const handleNavigateToCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    router.push(`/${appName}/${categoryId}`);
  };

  const handleEditCategory = (name: string, id: string) => {
    setIsAddNewCategory("Edit");
    setNewCategoryName(name);
    setCategoryToUpdateId(id);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const handleCreateCategory = () => {
    createCategory.mutate(
      { categoryName: newCategoryName },
      {
        onSuccess: () => closeModalAndClearData,
      }
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
      }
    );
  };

  const closeModalAndClearData = () => {
    setNewCategoryName("");
    setIsModalOpen(false);
    setCategoryToUpdateId(null);
  };

  if (!categories) return null;

  return (
    <div id="MainCategories" className="p-4 ">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit Categories</h2>

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
                className="mb-2 "
              />
              <RadixButton
                onClick={() => {
                  if (isAddNewCategory === "Create") handleCreateCategory();
                  else
                    categoryToUpdateId &&
                      handleUpdateCategory(categoryToUpdateId);
                }}
              >
                Create category
              </RadixButton>
            </div>
          ) : (
            <div>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm mb-2 hover:bg-gray-50 transition duration-200"
                >
                  <span className="text-gray-800">{category.name}</span>

                  <div className="flex gap-2">
                    <div
                      className="delete-product cursor-pointer"
                      onClick={() => {}}
                    >
                      {false ? <Spinner size={"2"} /> : <TrashIcon />}
                    </div>
                    <div
                      className="edit-product cursor-pointer"
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

      <div className="categories-wrapper mt-8">
        {isAdmin && (
          <RadixButton
            className="add-category-btn mb-4"
            onClick={handleOpenModal}
          >
            Edit Category
          </RadixButton>
        )}
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId;
          return (
            <div
              key={category.id}
              className={`category p-4 mb-2 rounded-lg transition-colors ${
                isSelected ? "selected" : ""
              } `}
              onClick={() => handleNavigateToCategory(category.id)}
            >
              <span>{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCategories;
