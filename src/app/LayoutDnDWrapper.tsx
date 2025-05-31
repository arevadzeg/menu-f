import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
} from '@dnd-kit/core';
import { useParams, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';
import { isString } from 'lodash';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import ProductCardSmall from './components/product/PorductCard/Components/ProductCardSmall/ProductCardSmall';
import draggingCardAtom from './atom/draggingCardAtom';
import { useUpdateProduct } from './api/hooks/product/useProductMutations';
import { useGetStore } from './api/hooks/store/useGetStore';

function LayoutDnDWrapper({ children }: any) {
  const [product, setProduct] = useAtom(draggingCardAtom);
  const { data: store } = useGetStore();
  const router = useRouter();
  const { categoryId, subCategoryId } = useParams<{
    categoryId: string;
    subCategoryId: string;
  }>();
  const updateProduct = useUpdateProduct();
  const queryClient = useQueryClient();

  const handleDragStart = (event: DragStartEvent) => {
    setProduct(event.active.data?.current?.product);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const overCategoryId = event.over?.id;
    if (overCategoryId) router.push(`/${store?.name}/${overCategoryId}`);
  };

  const invalidateProductCategoryQueries = (id: string) => {
    queryClient.invalidateQueries({
      predicate: (query) => Array.isArray(query.queryKey) && query.queryKey.includes(id),
    });
  };

  const handleDragEnd = async () => {
    if (!product || !isString(categoryId)) return;

    try {
      if (categoryId === product.categoryId) return;
      await updateProduct.mutateAsync({
        image: product.image,
        price: product.price,
        title: product.title,
        id: product.id,
        description: product.description,
        ...(categoryId && { categoryId }),
        ...(subCategoryId && { subCategoryId }),
      });
      invalidateProductCategoryQueries(product.categoryId);
      setProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <DndContext
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      {children}
      <DragOverlay modifiers={[snapCenterToCursor]}>
        {product && <ProductCardSmall product={product} />}
      </DragOverlay>
    </DndContext>
  );
}

export default LayoutDnDWrapper;
