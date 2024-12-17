"use client";

import { Product } from "<root>/app/api/hooks/product/InterfaceProduct";
import { useDraggable } from "@dnd-kit/core";
import React, { ReactElement } from "react";

const DraggableProductCard = ({ product, children }: { children: ReactElement, product: Product }) => {
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

            {children}
        </div>
    );
};

export default DraggableProductCard;
