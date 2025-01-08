import React, { useState } from "react";
import useGetInfiniteProducts from "<root>/app/api/hooks/product/useGetProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../product/PorductCard/ProductCard";
import DraggableProductCard from "../../product/PorductCard/Components/DragableProductCard/DragableProductCard";
import './ProductViewLayout.scss'
import EmptyPorductView from "./EmptyPorductView/EmptyPorductView";

const skeletonArray = [...Array(5)].map(() => undefined);

const ProductViewLayout = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useGetInfiniteProducts();

  const products =
    data?.pages.flatMap((page) => page.products) ?? skeletonArray;
  const isProductsEmpty = isSuccess && products.length === 0;

  if (isProductsEmpty) {
    return <EmptyPorductView />
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
      <div id="product-layout">

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
