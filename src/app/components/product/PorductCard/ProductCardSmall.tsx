import React from "react";
import "./ProductCard.scss";

import { Product } from "<root>/app/api/hooks/product/InterfaceProduct";

interface ProductCardSmallProps {
    product: Product;
}

const ProductCardSmall: React.FC<ProductCardSmallProps> = ({ product }) => {

    return (
        <div className="product-card-small bg-gray-100 rounded-lg shadow-md p-4" >

            <div className="product-content">
                <h2 className="product-title text-lg font-semibold text-gray-800">{product.title}</h2>
            </div>
        </div>

    );
};

export default ProductCardSmall;
