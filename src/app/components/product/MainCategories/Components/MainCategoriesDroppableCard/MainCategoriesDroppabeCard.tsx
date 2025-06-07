import { Category } from '<root>/app/api/hooks/category/interfaceCategory';
import { useDroppable } from '@dnd-kit/core';

interface MainCategoriesDroppabeCardProps {
  category: Category;
  isSelected: boolean;
  handleNavigateToCategory: (categoryId: string) => void;
}

function MainCategoriesDroppabeCard({
  category,
  isSelected,
  handleNavigateToCategory,
}: MainCategoriesDroppabeCardProps) {
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
      role="button"
      tabIndex={0}
      className={`category p-4 ${isSelected ? 'text-primary' : 'text-primaryText'}`}
      onClick={() => handleNavigateToCategory(category.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigateToCategory(category.id);
        }
      }}
    >
      <span>{category.name}</span>
    </div>
  );
}

export default MainCategoriesDroppabeCard;
