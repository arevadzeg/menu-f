import { DndContext, DragOverEvent, DragOverlay, DragStartEvent, pointerWithin } from "@dnd-kit/core"
import { useParams, useRouter } from "next/navigation";
import { useUpdateProduct } from "./api/hooks/product/useProductMutations";
import { useAtom } from "jotai";
import { draggingCardAtom } from "./atom/draggingCardAtom";
import { useQueryClient } from "@tanstack/react-query";
import { isString } from 'lodash'
import ProductCardSmall from "./components/product/PorductCard/Components/ProductCardSmall/ProductCardSmall";
import { snapCenterToCursor } from '@dnd-kit/modifiers'

const LayoutDnDWrapper = ({ children }: any) => {

    const [product, setProduct] = useAtom(draggingCardAtom)
    const router = useRouter();
    const { categoryId, subCategoryId } = useParams<{
        categoryId: string;
        subCategoryId: string;
    }>(); const updateProduct = useUpdateProduct();
    const queryClient = useQueryClient();



    const handleDragStart = (event: DragStartEvent) => {
        setProduct(event.active.data?.current?.product)
    }

    const handleDragOver = (event: DragOverEvent) => {
        const overCategoryId = event.over?.id;
        if (overCategoryId) router.push(`/bolo/${overCategoryId}`);
    };

    const handleDragEnd = async () => {
        if (!product || !isString(categoryId)) return;

        try {
            if (categoryId === product.categoryId) return
            await updateProduct.mutateAsync({
                image: product.image,
                price: product.price,
                title: product.title,
                productId: product.id,
                description: product.description,
                ...(categoryId && { categoryId }),
                ...(subCategoryId && { subCategoryId }),
            });
            invalidateProductCategoryQueries(product.categoryId);
            setProduct(null);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const invalidateProductCategoryQueries = (categoryId: string) => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                Array.isArray(query.queryKey) && query.queryKey.includes(categoryId),
        });
    };

    return <DndContext
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
    >
        {children}
        <DragOverlay modifiers={[snapCenterToCursor]}>
            {product && <ProductCardSmall product={product} />}
        </DragOverlay>
    </DndContext >


}

export default LayoutDnDWrapper