"use client"; // Now you can use this since it's separated

import "./globals.css";
import { Header } from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Alert from "./components/ui/Alert/Alert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Theme>
            <Header />
            <div className="px-8">{children}</div>
            <Alert />
            <Footer />
          </Theme>
        </QueryClientProvider>
      </body>
    </html>
  );
}
