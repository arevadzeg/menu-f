import { Skeleton } from '@radix-ui/themes';

const SKELETON_CATEGORIES = [1, 2, 3, 4, 5, 9, 10];

const MainCategoriesSkeleton = () => SKELETON_CATEGORIES.map((item) => (
  <Skeleton key={item} width={`${70 + Math.random() * 20}px`} height="30px" />
));

export default MainCategoriesSkeleton;
