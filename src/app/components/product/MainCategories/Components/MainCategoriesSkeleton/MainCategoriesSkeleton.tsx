import { Skeleton } from "@radix-ui/themes";

const SKELETON_CATEGORIES = [1, 2, 3, 4, 5, 9, 10];

const MainCategoriesSkeleton = () => {
  return SKELETON_CATEGORIES.map((_, idx) => (
    <Skeleton key={idx} width={`${70 + Math.random() * 20}px`} height="30px" />
  ));
};

export default MainCategoriesSkeleton;
