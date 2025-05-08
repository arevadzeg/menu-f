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
import EmptyMainCategories from "./Components/EmptyMainCategories/EmptyMainCategories";
import CreateEditMainCategoryModal from "./Components/CreateEditMainCategoryModal/CreateEditMainCategoryModal";
import Carousel from "../../ui/Carousel/Carousel";


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


  const OPTIONS: any = {}
  const SLIDE_COUNT = 1


  return (
    <div id="MainCategories">
      <CreateEditMainCategoryModal handleCloseModal={handleCloseModal} isModalOpen={isModalOpen} />

      {isCategoriesCreated ? <EmptyMainCategories onCreateFilter={handleOpenModal} /> :

        <div className="categories-wrapper">
          <Carousel slides={categories ?? []} options={OPTIONS} />

          {isAdmin && (
            <RadixButton
              className="add-category-btn"
              onClick={handleOpenModal}
            >
              <GearIcon />
            </RadixButton>
          )}
          {/* <div>
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
          </div> */}
          {/* <span className="arrow">
            <ArrowIcon className="arrow-right arrow-icon" />
          </span> */}
        </div>
      }
    </div >
  );
};

export default MainCategories;
