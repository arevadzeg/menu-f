import React, { useState } from "react";
import "./ProductCard.scss";
import { Spinner } from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useDeleteProduct } from "<root>/app/api/hooks/product/useProductMutations";
import Modal from "../../ui/Modal/Modal";
import CreateProductForm from "../CreateProductForm/CreateProductForm";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { Product } from "<root>/app/api/hooks/product/InterfaceProduct";
import ProductCardSkeleton from "./Components/ProductCardSkeleton/ProductCardSkeleton";

interface ProductCardProps {
  isLoading?: boolean;
  product?: Product;
  isShowMinimizedVersion?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading, isShowMinimizedVersion = false }) => {
  const [user] = useAtom(authAtom);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const deleteProduct = useDeleteProduct();

  const isAdmin = !!user?.isTurnUserMode;
  const isProductsLoading = isLoading || !product;

  const handleDeleteProduce = () => {
    product && deleteProduct.mutate(product.id);
  };

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };



  if (isProductsLoading) return <ProductCardSkeleton />;

  return (
    <div id="product-card">
      <div className="image-wrapper ">
        <img src={product.image} />
      </div>
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
      {product.isOnSale && <div className="sale-indicator">Sale</div>}
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>
        <span
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></span>
        <span className="price">{product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
