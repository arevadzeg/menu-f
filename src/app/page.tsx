"use client"; // Add this line
import FilterSort from "./components/product/FilterSort/FilterSort";
import ProductViewLayout from "./components/layout/ProductViewLayout/ProductViewLayout";
import { QueryClient } from "@tanstack/react-query";
import Alert from "./components/ui/Alert/Alert";
import MainCategories from "./components/product/MainCategories/MainCategories";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <div>
      <FilterSort />
      <MainCategories />
      <ProductViewLayout />
      <Alert />
    </div>
  );
}
