import React, { useState } from 'react';
import useGetInfiniteProducts from '<root>/app/api/hooks/product/useGetProducts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Product } from '<root>/app/api/hooks/product/InterfaceProduct';
import ProductCard from '../../product/PorductCard/ProductCard';
import DraggableProductCard from '../../product/PorductCard/Components/DragableProductCard/DragableProductCard';
import EmptyPorductView from './EmptyPorductView/EmptyPorductView';
import Modal from '../../ui/Modal/Modal';
import CreateProductForm from '../../product/CreateProductForm/CreateProductForm';

const skeletonArray = [...Array(5)].map(() => undefined);

function ProductViewLayout() {
  const {
    data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess,
  } = useGetInfiniteProducts();

  const [isEditModalOpen, setIsEditModalOpen] = useState<null | Product>(null);

  const closeModal = () => {
    setIsEditModalOpen(null);
  };

  const products = data?.pages.flatMap((page) => page.products) ?? skeletonArray;
  const isProductsEmpty = isSuccess && products.length === 0;

  if (isProductsEmpty) {
    return <EmptyPorductView />;
  }

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={() => fetchNextPage()}
      hasMore={Boolean(hasNextPage)}
      loader={<div />}
      style={{
        overflow: 'unset',
      }}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 border border-dashed border-transparent">
        {products?.map((product) => (product?.id ? (
          <>
            {isEditModalOpen?.id === product.id && (
              <Modal isOpen={!!isEditModalOpen} onClose={closeModal}>
                <CreateProductForm
                  isUpdateMode
                  productData={product}
                  closeModal={closeModal}
                />
              </Modal>
            )}
            <DraggableProductCard
              product={product}
              key={product.id}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </>
        ) : (
          <ProductCard key={product?.id} isLoading />
        )))}
        {isFetchingNextPage
          && skeletonArray.map((item) => (
            <ProductCard key={item} isLoading />
          ))}
      </div>
    </InfiniteScroll>
  );
}

export default ProductViewLayout;
