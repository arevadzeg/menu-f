import React from 'react';
import { Product } from '<root>/app/api/hooks/product/InterfaceProduct';

interface ProductCardSmallProps {
  product: Product;
}

const ProductCardSmall: React.FC<ProductCardSmallProps> = ({ product }) => (
  <div className="bg-gray-100 rounded-lg shadow-md p-4">
    <h2 className="text-lg font-semibold">{product.title}</h2>
  </div>
);

export default ProductCardSmall;
