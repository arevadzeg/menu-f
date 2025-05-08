import { useCreateCategory, useUpdateCategory } from "<root>/app/api/hooks/category/useCategoryMutations";
import useGetCategories from "<root>/app/api/hooks/category/useGetCategories";
import Modal from "<root>/app/components/ui/Modal/Modal";
import RadixButton from "<root>/app/components/ui/RadixButton/RadixButton";
import TextField from "<root>/app/components/ui/TextField/TextField";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Spinner } from "@radix-ui/themes";
import { useState } from "react";
import './CreateEditMainCategoryModal.scss'


interface CreateEditMainCategoryModalProps {
    handleCloseModal: () => void;
    isModalOpen: boolean

}

const CreateEditMainCategoryModal = ({
    handleCloseModal,
    isModalOpen,

}: CreateEditMainCategoryModalProps) => {

    const [isAddNewCategory, setIsAddNewCategory] = useState<
        "Create" | "Edit" | null
    >(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [categoryToUpdateId, setCategoryToUpdateId] = useState<string | null>(
        null
    );


    const { data: categories } = useGetCategories();
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();

    const isCreateUpdateLoading = isAddNewCategory === "Create" ? createCategory.isPending : updateCategory.isPending

    const handleCreateCategory = () => {
        createCategory.mutate(
            { categoryName: newCategoryName },
            {
                onSuccess: closeModalAndClearData,
            }
        );
    };

    const handleUpdateCategory = (categoryToUpdateId: string) => {
        updateCategory.mutate(
            {
                categoryName: newCategoryName,
                categoryId: categoryToUpdateId,
            },
            {
                onSuccess: closeModalAndClearData,
            }
        );
    };

    const closeModalAndClearData = () => {
        setNewCategoryName("");
        // handleCloseModal()
        setIsAddNewCategory(null)
        setCategoryToUpdateId(null);
    };

    const handleEditCategory = (name: string, id: string) => {
        setIsAddNewCategory("Edit");
        setNewCategoryName(name);
        setCategoryToUpdateId(id);
    };




    return <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
        <div id="modal-container">
            <h2 className="modal-title">Edit Categories</h2>

            <RadixButton
                onClick={() => {
                    setIsAddNewCategory((prev) => (!!prev ? null : "Create"));
                }}
                className="add-new-button"
            >
                {isAddNewCategory ? "Back" : "Add New Category"}
            </RadixButton>

            {isAddNewCategory ? (
                <div>
                    <TextField
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="text-field"
                    />
                    <RadixButton
                        onClick={() => {
                            if (isAddNewCategory === "Create") handleCreateCategory();
                            else categoryToUpdateId && handleUpdateCategory(categoryToUpdateId);
                        }}
                        loading={isCreateUpdateLoading}
                    >
                        Create category
                    </RadixButton>
                </div>
            ) : (
                <div className="category-item-wrapper">
                    {categories &&
                        categories.map((category) => (
                            <div key={category.id} className="category-item">
                                <span className="category-name">{category.name}</span>
                                <div className="actions-container">
                                    <div className="delete-product" onClick={() => { }}>
                                        {false ? <Spinner size={"2"} /> : <TrashIcon />}
                                    </div>
                                    <div
                                        className="edit-product"
                                        onClick={() => handleEditCategory(category.name, category.id)}
                                    >
                                        <Pencil1Icon />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    </Modal>
}


export default CreateEditMainCategoryModal