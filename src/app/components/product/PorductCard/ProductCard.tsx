import React from "react";
import "./ProductCard.scss";

type ProductCardProps = {
  title: string;
  price: string;
  isOnSale?: boolean;
  image: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  isOnSale,
  image,
}) => {
  return (
    <div
      className="product-card h-48 bg-cover rounded-3xl cursor-pointer"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {isOnSale && <div className="sale-indicator">Sale</div>}
      <div className="product-content">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
