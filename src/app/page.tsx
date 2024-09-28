import { Theme, ThemePanel } from "@radix-ui/themes";
import { Header } from "./components/layout/Header/Header";
import FilterSort from "./components/product/FilterSort/FilterSort";
import ProductViewLayout from "./components/layout/ProductViewLayout/ProductViewLayout";

export default function Home() {
  return (
    <div>
      <Theme>
        <ThemePanel />
        <Header />
        <FilterSort />
        <ProductViewLayout />
      </Theme>
    </div>
  );
}
