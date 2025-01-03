"use client";
import { useParams, useRouter } from "next/navigation";
import "./MainCategories.scss";
import { useState } from "react";
import {
  GearIcon,
} from "@radix-ui/react-icons";
import RadixButton from "../../ui/RadixButton/RadixButton";
import useGetCategories from "<root>/app/api/hooks/category/useGetCategories";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import MainCategoriesCard from "./Components/MainCategoriesDroppableCard/MainCategoriesDroppabeCard";
import ArrowIcon from "../../ui/SVGAssets/ArrowIcon";
import MainCategoriesSkeleton from "./Components/MainCategoriesSkeleton/MainCategoriesSkeleton";
import EmptyMainCategories from "./Components/EmptyMainCategories/EmptyMainCategories";
import CreateEditMainCategoryModal from "./Components/CreateEditMainCategoryModal/CreateEditMainCategoryModal";


const MainCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { appName, categoryId } = useParams();
  const [user] = useAtom(authAtom);
  const router = useRouter();
  const { data: categories, isSuccess } = useGetCategories();


  const handleNavigateToCategory = (categoryId: string) => {
    router.push(`/${appName}/${categoryId}`);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const isAdmin = !!user?.isTurnUserMode;
  const isCategoriesCreated = isSuccess && categories.length === 0 && isAdmin;



  return (
    <div id="MainCategories">
      <CreateEditMainCategoryModal handleCloseModal={handleCloseModal} isModalOpen={isModalOpen} />

      {isCategoriesCreated ? <EmptyMainCategories onCreateFilter={handleOpenModal} /> :

        <div className="categories-wrapper">
          <span className="arrow">
            <ArrowIcon className="arrow-icon" />
          </span>
          {isAdmin && (
            <RadixButton
              className="add-category-btn"
              onClick={handleOpenModal}
            >
              <GearIcon />
            </RadixButton>
          )}
          <div>
            {!isSuccess
              ? <MainCategoriesSkeleton />
              : categories.map((category: any) => (
                <MainCategoriesCard
                  key={category.id}
                  category={category}
                  isSelected={categoryId === category.id}
                  handleNavigateToCategory={handleNavigateToCategory}
                />
              ))}
          </div>
          <span className="arrow">
            <ArrowIcon className="arrow-right arrow-icon" />
          </span>
        </div>
      }
    </div >
  );
};

export default MainCategories;
