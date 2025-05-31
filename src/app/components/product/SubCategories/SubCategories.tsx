import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { GearIcon } from '@radix-ui/react-icons';
import useGetCategories from '<root>/app/api/hooks/category/useGetCategories';
import { useAtom } from 'jotai';
import authAtom from '<root>/app/atom/authAtom';
import RadixButton from '../../ui/RadixButton/RadixButton';
import SubCategoriesCard from './components/SubCategoriesDroppableCard/SubCategoriesDroppableCard';
import EmptySubCategories from './components/EmptySubCategories/EmptySubCategories';
import CreateEditSubCategoryModal from './components/CreateEditSubCategoryModal/CreateEditSubCategoryModal';

function SubCategories() {
  const [user] = useAtom(authAtom);
  const isAdmin = !!user?.isTurnUserMode;

  const router = useRouter();
  const { data: categories } = useGetCategories();
  const { categoryId, appName, subCategoryId } = useParams();

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
  string | null
  >(subCategoryId ? String(subCategoryId) : null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const category = categories?.find((cat) => cat.id === categoryId);
  const isShowSubCategories = category && (category.subCategories.length > 0 || isAdmin);

  const handleNavigateToSubCategory = (id: string) => {
    setSelectedSubCategoryId(id);
    router.push(`/${appName}/${categoryId}/${id}`);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div
      className={`p-4 ${isAdmin
        ? 'relative border border-dashed border-transparent rounded-lg group hover:bg-editColor hover:border-black'
        : ''
      }`}
    >
      <CreateEditSubCategoryModal
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />

      {isShowSubCategories && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-primaryText">
            {category.name}
            {' '}
            Subcategories
          </h2>
          <ul>
            {isAdmin && (
              <RadixButton
                onClick={() => setIsModalOpen(true)}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 block"
              >
                <GearIcon />
              </RadixButton>
            )}

            {category.subCategories.map((sub) => (
              <SubCategoriesCard
                key={sub.id}
                subCategory={sub}
                categoryId={category.id}
                handleNavigateToSubCategory={handleNavigateToSubCategory}
                isSelected={selectedSubCategoryId === sub.id}
              />
            ))}

            {category.subCategories.length === 0 && <EmptySubCategories />}
          </ul>
        </>
      )}
    </div>
  );
}

export default SubCategories;
