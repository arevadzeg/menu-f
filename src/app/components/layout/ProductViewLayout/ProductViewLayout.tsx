import React, { useState } from "react";
import useGetInfiniteProducts from "<root>/app/api/hooks/product/useGetProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../product/PorductCard/ProductCard";
import DraggableProductCard from "../../product/PorductCard/Components/DragableProductCard/DragableProductCard";
import './ProductViewLayout.scss'
import EmptyPorductView from "./EmptyPorductView/EmptyPorductView";
import Modal from "../../ui/Modal/Modal";
import CreateProductForm from "../../product/CreateProductForm/CreateProductForm";

const skeletonArray = [...Array(5)].map(() => undefined);

const ProductViewLayout = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useGetInfiniteProducts();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

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
          (product, index) => {
            console.log('product', product?.id, products)
            return product?.id ?

              <>
                <Modal isOpen={isEditModalOpen} onClose={closeModal}>
                  <CreateProductForm
                    isUpdateMode
                    productData={product}
                    closeModal={closeModal}
                  />
                </Modal>
                <DraggableProductCard product={product} key={product.id} setIsEditModalOpen={setIsEditModalOpen} />
              </>
              : <ProductCard key={index} isLoading />
          }
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
