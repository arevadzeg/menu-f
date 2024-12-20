"use client"; // Add this line
import { useParams, useRouter } from "next/navigation";
import "./SubCategories.scss";
import { useState } from "react";
import {
  GearIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import RadixButton from "../../ui/RadixButton/RadixButton";
import useGetCategories from "<root>/app/api/hooks/category/useGetCategories";
import TextField from "../../ui/TextField/TextField";
import Modal from "../../ui/Modal/Modal";
import { Spinner } from "@radix-ui/themes";
import {
  useCreateSubCategory,
  useUpdateSubCategory,
} from "<root>/app/api/hooks/category/useCategoryMutations";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import SubCategoriesCard from "./SubCategoriesCard";

const SubCategories = () => {
  const [user] = useAtom(authAtom);

  const isAdmin = !!user;
  const router = useRouter();
  const { categoryId, appName, subCategoryId } = useParams();
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(!!subCategoryId ? String(subCategoryId) : null);
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [subCategoryToUpdateId, setSubCategoryToUpdateId] = useState<
    string | null
  >(null);
  const [isAddNewSubCategory, setIsAddNewSubCategory] = useState<
    "Create" | "Edit" | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories } = useGetCategories();
  const createSubCategory = useCreateSubCategory();
  const updateSubCategory = useUpdateSubCategory();

  const category = categories?.find((cat) => cat.id === categoryId);


  const isShowSubCategories = category && (category.subCategories.length > 0 || isAdmin);


  const handleNavigateToSubCategory = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
    router.push(`/${appName}/${categoryId}/${subCategoryId}`);
  };

  const handleEditSubCategory = (name: string, id: string) => {
    setIsAddNewSubCategory("Edit");
    setNewSubCategoryName(name);
    setSubCategoryToUpdateId(id);
  };

  const closeModalAndClearData = () => {
    setNewSubCategoryName("");
    setIsModalOpen(false);
    setSubCategoryToUpdateId(null);
  };

  const handleCreateOrUpdateSubCategory = () => {
    if (isAddNewSubCategory === "Create") {
      createSubCategory.mutate(
        { subCategoryName: newSubCategoryName, categoryId: category?.id ?? "" },
        { onSuccess: closeModalAndClearData }
      );
    } else if (subCategoryToUpdateId) {
      updateSubCategory.mutate(
        {
          subCategoryName: newSubCategoryName,
          subCategoryId: subCategoryToUpdateId,
        },
        { onSuccess: closeModalAndClearData }
      );
    }
  };

  return (
    <div className="sub-categories p-4">
      <Modal isOpen={isModalOpen} onClose={closeModalAndClearData}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit Subcategories</h2>
          <RadixButton
            onClick={() =>
              setIsAddNewSubCategory((prev) => (!!prev ? null : "Create"))
            }
            className="mb-4"
          >
            {isAddNewSubCategory ? "Back" : "Add New Subcategory"}
          </RadixButton>

          {isAddNewSubCategory && (
            <div>
              <TextField
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e.target.value)}
                className="mb-2"
              />
              <RadixButton onClick={handleCreateOrUpdateSubCategory}>
                {isAddNewSubCategory === "Create"
                  ? "Create Subcategory"
                  : "Update Subcategory"}
              </RadixButton>
            </div>
          )}

          {!isAddNewSubCategory &&
            category?.subCategories?.map((subCategory) => (
              <div
                key={subCategory.id}
                className="flex justify-between items-center p-2  rounded-lg shadow-sm mb-2  transition duration-200"
              >
                <span className="text-gray-800">{subCategory.name}</span>
                <div className="flex gap-2">
                  <div
                    className="cursor-pointer delete-product"
                    onClick={() => { }}
                  >
                    {false ? <Spinner size="2" /> : <TrashIcon />}
                  </div>
                  <div
                    className="cursor-pointer edit-product"
                    onClick={() =>
                      handleEditSubCategory(subCategory.name, subCategory.id)
                    }
                  >
                    <Pencil1Icon />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Modal>

      {isShowSubCategories && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {category.name} Subcategories
          </h2>
          <ul>
            {isAdmin && (
              <RadixButton
                onClick={() => setIsModalOpen(true)}
                className="edit-sub-category"
              >
                <GearIcon />
              </RadixButton>
            )}
            {category.subCategories.map((sub) => (
              <SubCategoriesCard key={sub.id} subCategory={sub} categoryId={category.id} handleNavigateToSubCategory={handleNavigateToSubCategory} isSelected={selectedSubCategoryId === sub.id} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SubCategories;
