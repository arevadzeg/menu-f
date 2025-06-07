import { Product } from '<root>/app/api/hooks/product/InterfaceProduct';
import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import ProductCard from '../../ProductCard';

function DraggableProductCard({
  product,
  setIsEditModalOpen,
  setIsMoreDetailsModalOpen,
}: {
  product: Product;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<Product | null>>;
  setIsMoreDetailsModalOpen: React.Dispatch<
  React.SetStateAction<Product | null>
  >;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: product.id,
    data: { product },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className="relative">
      <ProductCard
        product={product}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsMoreDetailsModalOpen={setIsMoreDetailsModalOpen}
      />
    </div>
  );
}

export default DraggableProductCard;
