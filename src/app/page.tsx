"use client"; // Add this line
import { Theme } from "@radix-ui/themes";
import { Header } from "./components/layout/Header/Header";
import FilterSort from "./components/product/FilterSort/FilterSort";
import ProductViewLayout from "./components/layout/ProductViewLayout/ProductViewLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Alert from "./components/ui/Alert/Alert";
import { useState } from "react";

const themes = [
  { name: "Warm Sunset", className: "theme-warm-sunset" },
  { name: "Ocean Breeze", className: "theme-ocean-breeze" },
  { name: "Forest Calm", className: "theme-forest-calm" },
  { name: "Royal Night", className: "theme-royal-night" },
  { name: "Minimalist Gray", className: "theme-minimalist-gray" },
];
export default function Home() {
  const queryClient = new QueryClient();

  const [selectedTheme, setSelectedTheme] = useState<string>("");

  const handleThemeChange = (theme: string) => {
    document.body.classList.remove(...themes.map((t) => t.className));
    document.body.classList.add(theme);
    setSelectedTheme(theme);
  };

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className="theme-switcher">
          {themes.map((theme) => (
            <button
              key={theme.className}
              onClick={() => handleThemeChange(theme.className)}
              className={`p-2 border ${
                selectedTheme === theme.className
                  ? "border-primary"
                  : "border-border"
              } bg-background text-text`}
            >
              {theme.name}
            </button>
          ))}
        </div>
        <Theme>
          <Header />
          <FilterSort />
          <ProductViewLayout />
          <Alert />
        </Theme>
      </QueryClientProvider>
    </div>
  );
}
