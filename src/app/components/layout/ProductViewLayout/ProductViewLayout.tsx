"use client"; // Add this line

import React, { useState } from "react";
// import { UserIcon, PlusIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import useGetInfiniteProducts from "<root>/app/api/hooks/product/useGetProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../product/PorductCard/ProductCard";
import Modal from "../../ui/Modal/Modal";
import CreateProductForm from "../../product/CreateProductForm/CreateProductForm";
import DraggableProductCard from "../../product/PorductCard/DragableProductCard";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { ExclamationTriangleIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import RadixButton from "../../ui/RadixButton/RadixButton";
import './ProductViewLayout.scss'

const skeletonArray = [...Array(5)].map(() => undefined);

const ProductViewLayout = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useGetInfiniteProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useAtom(authAtom);

  const isAdmin = !!user?.isTurnUserMode;

  const products =
    data?.pages.flatMap((page) => page.products) ?? skeletonArray;

  const isProductsEmpty = isSuccess && products.length === 0;

  if (isProductsEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <ExclamationTriangleIcon />
        {/* <ExclamationCircleIcon className="h-12 w-12 text-gray-400 mb-4" /> */}
        <h2 className="text-xl font-semibold">
          {isAdmin ? "No Products Found" : "No Products Available"}
        </h2>
        {isAdmin ? (

          <RadixButton
            onClick={() => setIsModalOpen(true)}
            className="mt-4 flex items-center px-4 py-2 "
          >
            <PlusCircledIcon />
            Create a Product
          </RadixButton>
        ) : (
          <p className="mt-4 text-gray-500">
            Please check back later for updates!
          </p>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <CreateProductForm />
        </Modal>
      </div>
    );
  }

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
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"> */}
      <div className="grid product-layout">

        {products?.map(
          (product, index) =>
            product ? <DraggableProductCard product={product} key={product.id} /> : <ProductCard key={index} isLoading />
        )}
        {isFetchingNextPage &&
          skeletonArray.map((_, index) => (
            <ProductCard key={index} isLoading />
          ))}
      </div>


    </InfiniteScroll>
  );
};

export default ProductViewLayout;
