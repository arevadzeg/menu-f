import { SubCategory } from '<root>/app/api/hooks/category/interfaceCategory';
import { useDroppable } from '@dnd-kit/core';

interface SubCategoriesCardProps {
  subCategory: SubCategory;
  isSelected: boolean;
  handleNavigateToSubCategory: (categoryId: string) => void;
  categoryId: string;
}

const SubCategoriesCard = ({
  subCategory,
  categoryId,
  isSelected,
  handleNavigateToSubCategory,
}: SubCategoriesCardProps) => {
  const { setNodeRef } = useDroppable({
    id: `${categoryId}/${subCategory.id}`,
    data: {
      isSubCategory: true,
    },
  });
  return (
    <div
      ref={setNodeRef}
      key={subCategory.id}
      className={`cursor-pointer p-1 flex justify-between items-center underline ${
        isSelected ? 'text-primary' : ''
      }`}
      onClick={() => handleNavigateToSubCategory(subCategory.id)}
    >
      <span>{subCategory.name}</span>
    </div>
  );
};

export default SubCategoriesCard;
