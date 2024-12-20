"use client";

import { Product } from "<root>/app/api/hooks/product/InterfaceProduct";
import { useDraggable } from "@dnd-kit/core";
import React from "react";
import ProductCard from "./ProductCard";

const DraggableProductCard = ({ product }: { product: Product }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: product.id,
        data: { product },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            <ProductCard product={product} />

        </div>
    );
};

export default DraggableProductCard;
