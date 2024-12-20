import { Category } from "<root>/app/api/hooks/category/interfaceCategory";
import { useDroppable } from "@dnd-kit/core";


interface MainCategoriesCardProps {
    category: Category;
    isSelected: boolean;
    handleNavigateToCategory: (categoryId: string) => void
}


const MainCategoriesCard = ({ category, isSelected, handleNavigateToCategory }: MainCategoriesCardProps) => {
    const { setNodeRef } = useDroppable({
        id: category.id,
        data: {
            isSubCategory: false,
        },
    });

    return <div
        ref={setNodeRef}
        key={category.id}
        className={`category p-4 mb-2  transition-colors ${isSelected ? "selected" : ""
            } `}
        onClick={() => handleNavigateToCategory(category.id)}
    >
        <span>{category.name}</span>
    </div>
}

export default MainCategoriesCard