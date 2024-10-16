"use client";
import ProductViewLayout from "../components/layout/ProductViewLayout/ProductViewLayout";
import FilterSort from "../components/product/FilterSort/FilterSort";
import MainCategories from "../components/product/MainCategories/MainCategories";

export default function Home() {
  return (
    <div>
      <FilterSort />
      <MainCategories />
      <ProductViewLayout />
    </div>
  );
}
