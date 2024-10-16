"use client"; // Add this line
import { Theme } from "@radix-ui/themes";
import { Header } from "./components/layout/Header/Header";
import FilterSort from "./components/product/FilterSort/FilterSort";
import ProductViewLayout from "./components/layout/ProductViewLayout/ProductViewLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Alert from "./components/ui/Alert/Alert";
import Footer from "./components/layout/Footer/Footer";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className="theme-switcher"></div>
        <Theme>
          <Header />
          <FilterSort />
          <ProductViewLayout />
          <Alert />
          <Footer />
        </Theme>
      </QueryClientProvider>
    </div>
  );
}
