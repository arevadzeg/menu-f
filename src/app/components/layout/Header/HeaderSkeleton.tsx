import { Skeleton } from '@radix-ui/themes';

const SKELETON_HEADER_ITEMS = [1, 2, 3];

export const HeaderSkeleton = () => {
  return (
    <nav
      id="Header"
      aria-label="header"
      className="h-20 flex items-center justify-between p-4 px-8 mb-8"
    >
      <div className="flex gap-4 font-bold items-center cursor-pointer">
        <Skeleton className="rounded-full" width="40px" height="40px" />
        <div className="flex flex-col gap-2">
          <Skeleton width="150px" height="10px" />
          <Skeleton width="100px" height="10px" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {SKELETON_HEADER_ITEMS.map((item, index) => (
          <Skeleton key={index} width="80px" height="30px" />
        ))}
      </div>
    </nav>
  );
};
