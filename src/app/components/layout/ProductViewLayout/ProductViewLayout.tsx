"use client"; // Add this line

import React from "react";
import useGetInfiniteProducts from "<root>/app/api/useGetProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../product/PorductCard/ProductCard";

const skeletonArray = [...Array(5)].map(() => undefined);

const ProductViewLayout = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteProducts();

  const products =
    data?.pages.flatMap((page) => page.products) ?? skeletonArray;
  console.log("page.products", products);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={() => fetchNextPage()}
      hasMore={Boolean(hasNextPage)}
      loader={<></>}
    >
      <div className="p-8 flex gap-16 flex-wrap justify-center">
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
