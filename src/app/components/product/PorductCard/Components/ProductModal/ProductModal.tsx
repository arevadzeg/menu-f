import useGetCategories from '<root>/app/api/hooks/category/useGetCategories';
import { Product } from '<root>/app/api/hooks/product/InterfaceProduct';
import Modal from '<root>/app/components/ui/Modal/Modal';
import { LayersIcon, StackIcon } from '@radix-ui/react-icons';

interface ProductModalProps {
  product: Product;
  isProductModalOpen: boolean;
  handleCloseMoreDetailsModal: () => void;
}

function ProductModal({
  product,
  isProductModalOpen,
  handleCloseMoreDetailsModal,
}: ProductModalProps) {
  const { data: categories } = useGetCategories();

  const getCategoryName = (categoryId: string): string => {
    const category = categories?.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const getSubCategoryName = (subCategoryId: string): string => {
    if (categories) {
      for (const category of categories) {
        const subCategory = category.subCategories.find(
          (sub) => sub.id === subCategoryId,
        );
        if (subCategory) return subCategory.name;
      }
    }
    return 'Unknown Subcategory';
  };

  return (
    <Modal
      isOpen={isProductModalOpen}
      onClose={handleCloseMoreDetailsModal}
      contentClassName="overflow-auto"
    >
      <div className="p-6 w-full space-y-6 overflow-auto">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain rounded-xl border"
          />
          {product.isOnSale && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              On Sale
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-b pt-8 pb-8">
          <h2 className="text-3xl font-semibold text-primaryText">
            {product.title}
          </h2>

          {product.description ? (
            <p
              className="text-sm leading-relaxed text-secondary"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : (
            <p className="text-sm leading-relaxed text-center text-secondary">
              No description added
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg font-medium text-primaryText">
            ₾
            {product.price}
          </div>

          <div className="flex items-center gap-2 text-sm text-secondary">
            <StackIcon className="w-4 h-4 text-primaryText" />
            <span className="font-medium text-primaryText">
              {getCategoryName(product.categoryId)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-seconday">
            <LayersIcon className="w-4 h-4 text-primaryText" />
            <span className="font-medium text-primaryText">
              {getSubCategoryName(product.subCategoryId)}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
