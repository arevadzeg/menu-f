import React from "react";
import "./ProductCard.scss";
import { Skeleton } from "@radix-ui/themes";
import { Product } from "<root>/app/api/useGetProducts";

interface ProductCardProps {
  isLoading?: boolean;
  product?: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading }) => {
  if (isLoading || !product)
    return <Skeleton className="product-card h-48 rounded-3xl" />;

  return (
    <div
      className="product-card h-48 bg-cover bg-center rounded-3xl cursor-pointer"
      style={{
        backgroundImage: `url(${product.image})`,
      }}
    >
      {product.isOnSale && <div className="sale-indicator">Sale</div>}
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
