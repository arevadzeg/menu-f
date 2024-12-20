"use client"; // Add this line

import React, { useState } from "react";
import useGetInfiniteProducts from "<root>/app/api/hooks/product/useGetProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../product/PorductCard/ProductCard";
import "./ProductViewLayout.scss";
import Modal from "../../ui/Modal/Modal";
import CreateProductForm from "../../product/CreateProductForm/CreateProductForm";
import DraggableProductCard from "../../product/PorductCard/DragableProductCard";

const skeletonArray = [...Array(5)].map(() => undefined);

const ProductViewLayout = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useGetInfiniteProducts();
  const [isModalOpen, setIsModalOpen] = useState(false)


  const products =
    data?.pages.flatMap((page) => page.products) ?? skeletonArray;

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={() => fetchNextPage()}
      hasMore={Boolean(hasNextPage)}
      loader={<></>}
      style={{
        overflow: "unset",
      }}
    >
      <div className="product-layout">

        {products?.map((product) => (
          product && <DraggableProductCard product={product} key={product.id} />

        ))}
        {isFetchingNextPage &&
          skeletonArray.map((_, index) => (
            <ProductCard key={index} isLoading />
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <CreateProductForm />
      </Modal>
    </InfiniteScroll>
  );
};

export default ProductViewLayout;
