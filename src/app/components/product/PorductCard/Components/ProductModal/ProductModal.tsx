import useGetCategories from "<root>/app/api/hooks/category/useGetCategories";
import { Product } from "<root>/app/api/hooks/product/InterfaceProduct";
import Modal from "<root>/app/components/ui/Modal/Modal";
import { LayersIcon, StackIcon } from "@radix-ui/react-icons";
import './productModal.scss';

interface ProductModalProps {
    product: Product;
    isProductModalOpen: boolean;
    handleCloseMoreDetailsModal: () => void;
}

const ProductModal = ({
    product,
    isProductModalOpen,
    handleCloseMoreDetailsModal,
}: ProductModalProps) => {
    const { data: categories } = useGetCategories();

    const getCategoryName = (categoryId: string): string => {
        const category = categories?.find((c) => c.id === categoryId);
        return category ? category.name : "Unknown Category";
    };

    const getSubCategoryName = (subCategoryId: string): string => {
        if (categories)
            for (const category of categories) {
                const subCategory = category.subCategories.find(
                    (sub) => sub.id === subCategoryId
                );
                if (subCategory) return subCategory.name;
            }
        return "Unknown Subcategory";
    };

    return (
        <Modal
            isOpen={isProductModalOpen}
            onClose={handleCloseMoreDetailsModal}
            contentClassName="overflow-auto"
        >
            <div className="product-modal">
                <div className="product-modal__image-wrapper">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-modal__image"
                    />
                    {product.isOnSale && (
                        <div className="product-modal__sale-badge">On Sale</div>
                    )}
                </div>

                <div className="product-modal__info">
                    <h2 className="product-modal__title">{product.title}</h2>
                    {product.description ? (
                        <p
                            className="product-modal__description"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    ) : (
                        <p className="product-modal__no-description">No description added</p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="product-modal__price">₾{product.price}</div>

                    <div className="product-modal__category">
                        <StackIcon />
                        <span>{getCategoryName(product.categoryId)}</span>
                    </div>

                    <div className="product-modal__subcategory">
                        <LayersIcon />
                        <span>{getSubCategoryName(product.subCategoryId)}</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;
