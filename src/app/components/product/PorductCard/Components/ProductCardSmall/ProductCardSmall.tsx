import React from "react";
import { Product } from "<root>/app/api/hooks/product/InterfaceProduct";
import './ProductCardSmall.scss'

interface ProductCardSmallProps {
    product: Product;
}

const ProductCardSmall: React.FC<ProductCardSmallProps> = ({ product }) => {
    return (
        <div className="product-card-small">
            <h2 className="product-title">{product.title}</h2>
        </div>
    );
};

export default ProductCardSmall;
