import { Category } from '<root>/app/api/hooks/category/interfaceCategory';
import { useDroppable } from '@dnd-kit/core';

interface MainCategoriesDroppabeCardProps {
  category: Category;
  isSelected: boolean;
  handleNavigateToCategory: (categoryId: string) => void;
}

const MainCategoriesDroppabeCard = ({
  category,
  isSelected,
  handleNavigateToCategory,
}: MainCategoriesDroppabeCardProps) => {
  const { setNodeRef } = useDroppable({
    id: category.id,
    data: {
      isSubCategory: false,
    },
  });

  return (
    <div
      ref={setNodeRef}
      key={category.id}
      className={`category p-4  transition-colors ${isSelected ? 'selected' : ''} `}
      onClick={() => handleNavigateToCategory(category.id)}
    >
      <span>{category.name}</span>
    </div>
  );
};

export default MainCategoriesDroppabeCard;
