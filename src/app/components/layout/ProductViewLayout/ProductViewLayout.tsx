"use client"; // Add this line

import React, { useState } from "react";
import useGetInfiniteProducts from "<root>/app/api/hooks/product/useGetProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../product/PorductCard/ProductCard";
import "./ProductViewLayout.scss";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { PlusIcon } from "@radix-ui/react-icons";
import Modal from "../../ui/Modal/Modal";
import CreateProductForm from "../../product/CreateProductForm/CreateProductForm";

const skeletonArray = [...Array(5)].map(() => undefined);

const ProductViewLayout = () => {
  const [user] = useAtom(authAtom);
  const isAdmin = !!user;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteProducts();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenCreateModal = () => setIsModalOpen(true)

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
        {
          isAdmin &&
          <div className="product-card h-72 create-product-card" onClick={handleOpenCreateModal}>
            <div className="flex gap-2 justify-center items-center h-full">
              Create Product <PlusIcon />
            </div>
          </div>

        }
        {products.map((product, index) => (
          <ProductCard key={product?.id ?? index} product={product} />
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
