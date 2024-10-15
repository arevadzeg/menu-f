import React, { useState } from "react";
import "./ProductCard.scss";
import { Skeleton, Spinner } from "@radix-ui/themes";
import { Product } from "<root>/app/api/useGetProducts";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useDeleteProduct } from "<root>/app/api/useCreateProduct";
import Modal from "../../ui/Modal/Modal";
import CreateProductForm from "../CreateProductForm/CreateProductForm";

interface ProductCardProps {
  isLoading?: boolean;
  product?: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading }) => {
  const isAdmin = true;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const deleteProduct = useDeleteProduct();

  const handleDeleteProduce = () => {
    product && deleteProduct.mutate(product.id);
  };

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  if (isLoading || !product) return <Skeleton className="product-card " />;

  return (
    <div
      className="product-card"
      style={{
        backgroundImage: `url(${product.image})`,
      }}
    >
      {isAdmin && (
        <div className="delete-product" onClick={handleDeleteProduce}>
          {deleteProduct.isPending ? <Spinner size={"2"} /> : <TrashIcon />}
        </div>
      )}
      {isAdmin && (
        <div className="edit-product" onClick={handleEditProduct}>
          <Pencil1Icon />
        </div>
      )}
      <Modal isOpen={isEditModalOpen} onClose={closeModal}>
        <CreateProductForm
          isUpdateMode
          productData={product}
          closeModal={closeModal}
        />
      </Modal>
      {!product.isOnSale && <div className="sale-indicator">Sale</div>}
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
