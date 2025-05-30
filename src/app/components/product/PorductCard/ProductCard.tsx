import React, { useState } from "react";
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
  setIsEditModalOpen?: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLoading,
  setIsEditModalOpen,
}) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [user] = useAtom(authAtom);
  const deleteProduct = useDeleteProduct();

  const isAdmin = !!user?.isTurnUserMode;
  const isProductsLoading = isLoading || !product;

  const handleDeleteProduce = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    product && deleteProduct.mutate(product.id);
  };

  const handleEditProduct = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsEditModalOpen && setIsEditModalOpen(product ?? null);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOpenMoreDetailsModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProductModalOpen(true);
  };

  const handleCloseMoreDetailsModal = () => setIsProductModalOpen(false);

  if (isProductsLoading) return <ProductCardSkeleton />;

  return (
    <div
      id="product-card"
      onPointerDown={handleOpenMoreDetailsModal}
      className="relative rounded-xl cursor-pointer flex flex-col gap-0 border"
    >
      <div className="rounded-xl overflow-hidden h-[70%] w-full">
        <img
          src={product.image}
          className="rounded-xl object-cover transition-all duration-300 ease-in-out h-[200px] w-full hover:scale-110"
        />
      </div>
      {isAdmin && (
        <div
          className="absolute top-8 right-6 p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          onPointerDown={(e) => handleDeleteProduce(e)}
        >
          {deleteProduct.isPending ? <Spinner size={"2"} /> : <TrashIcon />}
        </div>
      )}
      {isAdmin && (
        <div
          className="absolute top-8 right-16 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
          onPointerDown={(e) => handleEditProduct(e)}
        >
          <Pencil1Icon />
        </div>
      )}
      {product.isOnSale && (
        <div className="absolute text-lg top-5 left-5 font-bold px-4 py-1 rounded-xl">
          Sale
        </div>
      )}
      <div className="p-4 pb-8 text-center">
        <h2 className="text-lg font-bold h-[50px] overflow-hidden text-ellipsis text-primaryText">
          {product.title}
        </h2>
        <span
          className="text-sm overflow-hidden text-ellipsis h-[36px] block text-secondary"
          style={{
            // TODO NEEDS TO BE HERE
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></span>
        <span className="absolute py-2 text-white rounded-lg top-[99%] left-[50%] w-[90%] text-center bg-primary transform -translate-x-1/2 -translate-y-1/2">
          {product.price}
        </span>
      </div>
      {isProductModalOpen && product && (
        <ProductModal
          handleCloseMoreDetailsModal={handleCloseMoreDetailsModal}
          isProductModalOpen={isProductModalOpen}
          product={product}
        />
      )}
    </div>
  );
};

export default ProductCard;
