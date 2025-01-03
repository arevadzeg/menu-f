"use client"; // Add this line
import { useParams, useRouter } from "next/navigation";
import "./SubCategories.scss";
import { useState } from "react";
import {
  GearIcon,
} from "@radix-ui/react-icons";
import RadixButton from "../../ui/RadixButton/RadixButton";
import useGetCategories from "<root>/app/api/hooks/category/useGetCategories";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import SubCategoriesCard from "./components/SubCategoriesDroppableCard/SubCategoriesDroppableCard";
import EmptySubCategories from "./components/EmptySubCategories/EmptySubCategories";
import CreateEditSubCategoryModal from "./components/CreateEditSubCategoryModal/CreateEditSubCategoryModal";

const SubCategories = () => {
  const [user] = useAtom(authAtom);

  const router = useRouter();
  const { data: categories } = useGetCategories();
  const { categoryId, appName, subCategoryId } = useParams();
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(!!subCategoryId ? String(subCategoryId) : null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const isAdmin = !!user?.isTurnUserMode;
  const category = categories?.find((cat) => cat.id === categoryId);
  const isShowSubCategories = category && (category.subCategories.length > 0 || isAdmin);


  const handleNavigateToSubCategory = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
    router.push(`/${appName}/${categoryId}/${subCategoryId}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className="sub-categories p-4">
      <CreateEditSubCategoryModal handleCloseModal={handleCloseModal} isModalOpen={isModalOpen} />


      {isShowSubCategories && (
        <>
          <h2 className="text-2xl font-bold mb-4 subCategories-title" >
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
            {
              category.subCategories.length === 0 && <EmptySubCategories />
            }
          </ul>
        </>
      )}
    </div>
  );
};

export default SubCategories;
