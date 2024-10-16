"use client"; // Add this line

import React from "react";
import useGetInfiniteProducts from "<root>/app/api/useGetProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../product/PorductCard/ProductCard";
import "./ProductViewLayout.scss";

const skeletonArray = [...Array(5)].map(() => undefined);

const ProductViewLayout = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteProducts();

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
        {products.map((product, index) => (
          <ProductCard key={product?.id ?? index} product={product} />
        ))}
        {isFetchingNextPage &&
          skeletonArray.map((_, index) => (
            <ProductCard key={index} isLoading />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductViewLayout;
