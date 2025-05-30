import { useState } from 'react';
import { GearIcon } from '@radix-ui/react-icons';
import useGetCategories from '<root>/app/api/hooks/category/useGetCategories';
import { useAtom } from 'jotai';
import { authAtom } from '<root>/app/atom/authAtom';
import RadixButton from '../../ui/RadixButton/RadixButton';
import EmptyMainCategories from './Components/EmptyMainCategories/EmptyMainCategories';
import CreateEditMainCategoryModal from './Components/CreateEditMainCategoryModal/CreateEditMainCategoryModal';
import Carousel from '../../ui/Carousel/Carousel';

function MainCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useAtom(authAtom);
  const { data: categories, isSuccess } = useGetCategories();

  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const isAdmin = !!user?.isTurnUserMode;
  const isCategoriesCreated = isSuccess && categories.length === 0 && isAdmin;

  return (
    <div className="py-4">
      <CreateEditMainCategoryModal
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />

      {isCategoriesCreated ? (
        <EmptyMainCategories onCreateFilter={handleOpenModal} />
      ) : (
        <div
          className={`
            relative flex items-center gap-4 mx-auto
            w-[calc(100%-120px)]
            ${isAdmin ? 'border border-dashed border-transparent rounded-lg h-16 hover:border-black hover:bg-editColor' : ''}
          `}
        >
          <Carousel />

          {isAdmin && (
            <RadixButton
              className=" absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onClick={handleOpenModal}
            >
              <GearIcon />
            </RadixButton>
          )}
        </div>
      )}
    </div>
  );
}

export default MainCategories;
