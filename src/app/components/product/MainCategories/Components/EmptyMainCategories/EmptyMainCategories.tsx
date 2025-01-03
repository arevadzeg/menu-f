import RadixButton from "<root>/app/components/ui/RadixButton/RadixButton";



interface EmptyMainCategoriesProps {
    onCreateFilter: () => void;
}

const EmptyMainCategories = ({ onCreateFilter }: EmptyMainCategoriesProps) => {


    return (
        <div className="p-4  flex justify-center shadow-sm">
            <RadixButton
                onClick={onCreateFilter}
            >
                Create Category
            </RadixButton>
        </div>
    );

}

export default EmptyMainCategories