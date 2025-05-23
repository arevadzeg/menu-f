"use client";
import ProductViewLayout from "../components/layout/ProductViewLayout/ProductViewLayout";
import FilterSort from "../components/product/FilterSort/FilterSort";
import MainCategories from "../components/product/MainCategories/MainCategories";
import Breadcrumb from "../components/ui/BreadCrumb/BreadCrumb";
import { useBreadcrumbItems } from "../hooks/useGetBreadCrumbItems";
import './page.scss'

export default function Home() {

  const items = useBreadcrumbItems()

  return (
    <div id='main-page'>
      <Breadcrumb items={items} />
      <FilterSort />
      <MainCategories />
      <h1 className="title">All Products</h1>
      <ProductViewLayout />
    </div>
  );
}
