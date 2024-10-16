"use client";

import ProductViewLayout from "<root>/app/components/layout/ProductViewLayout/ProductViewLayout";
import FilterSort from "<root>/app/components/product/FilterSort/FilterSort";
import MainCategories from "<root>/app/components/product/MainCategories/MainCategories";
import SubCategories from "<root>/app/components/product/SubCategories/SubCategories";

export default function Home() {
  return (
    <div>
      <FilterSort />
      <MainCategories />
      <div className="flex gap-8 mt-8">
        <SubCategories />
        <div className="w-full">
          <ProductViewLayout />
        </div>
      </div>
    </div>
  );
}
