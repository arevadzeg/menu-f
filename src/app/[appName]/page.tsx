"use client";
import ProductViewLayout from "../components/layout/ProductViewLayout/ProductViewLayout";
import FilterSort from "../components/product/FilterSort/FilterSort";
import MainCategories from "../components/product/MainCategories/MainCategories";
import Breadcrumb from "../components/ui/BreadCrumb/BreadCrumb";
import { useBreadcrumbItems } from "../hooks/useGetBreadCrumbItems";

export default function Home() {

  const items = useBreadcrumbItems()

  return (
    <div>
      <FilterSort />
      <MainCategories />
      <h1>All Products</h1>
      <Breadcrumb items={items} />

      <ProductViewLayout />
    </div>
  );
}
