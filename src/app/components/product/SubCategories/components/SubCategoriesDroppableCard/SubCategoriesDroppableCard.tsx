import { SubCategory } from '<root>/app/api/hooks/category/interfaceCategory';
import { useDroppable } from '@dnd-kit/core';

interface SubCategoriesCardProps {
  subCategory: SubCategory;
  isSelected: boolean;
  handleNavigateToSubCategory: (categoryId: string) => void;
  categoryId: string;
}

function SubCategoriesCard({
  subCategory,
  categoryId,
  isSelected,
  handleNavigateToSubCategory,
}: SubCategoriesCardProps) {
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
        isSelected ? 'text-primary' : 'text-primaryText'
      }`}
      onClick={() => handleNavigateToSubCategory(subCategory.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleNavigateToSubCategory(subCategory.id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span>{subCategory.name}</span>
    </div>
  );
}

export default SubCategoriesCard;
