import React, { useState } from "react";
import "./ProductCard.scss";
import { Spinner } from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useDeleteProduct } from "<root>/app/api/hooks/product/useProductMutations";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { Product } from "<root>/app/api/hooks/product/InterfaceProduct";
import ProductCardSkeleton from "./Components/ProductCardSkeleton/ProductCardSkeleton";
import ProductModal from "./Components/ProductModal/ProductModal";

interface ProductCardProps {
  isLoading?: boolean;
  product?: Product;
  isShowMinimizedVersion?: boolean;
  setIsEditModalOpen?: React.Dispatch<React.SetStateAction<Product | null>>
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading, setIsEditModalOpen }) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [user] = useAtom(authAtom);
  const deleteProduct = useDeleteProduct();

  const isAdmin = !!user?.isTurnUserMode;
  const isProductsLoading = isLoading || !product;

  const handleDeleteProduce = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    product && deleteProduct.mutate(product.id);
  };

  const handleEditProduct = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsEditModalOpen && setIsEditModalOpen(product ?? null);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOpenMoreDetailsModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProductModalOpen(true)
  }

  const handleCloseMoreDetailsModal = () => setIsProductModalOpen(false)



  if (isProductsLoading) return <ProductCardSkeleton />;

  return (
    <div id="product-card" onPointerDown={handleOpenMoreDetailsModal}>
      <div className="image-wrapper ">
        <img src={product.image} />
      </div>
      {isAdmin && (
        <div className="delete-product" onPointerDown={(e) => handleDeleteProduce(e)}>
          {deleteProduct.isPending ? <Spinner size={"2"} /> : <TrashIcon />}
        </div>
      )}
      {isAdmin && (
        <div className="edit-product" onPointerDown={(e) => handleEditProduct(e)}>
          <Pencil1Icon />
        </div>
      )}
      {product.isOnSale && <div className="sale-indicator">Sale</div>}
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>
        <span
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></span>
        <span className="price">{product.price}</span>
      </div>
      {isProductModalOpen && product && (
        <ProductModal handleCloseMoreDetailsModal={handleCloseMoreDetailsModal} isProductModalOpen={isProductModalOpen} product={product} />
      )}
    </div>
  );
};

export default ProductCard;
