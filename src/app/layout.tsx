"use client"; // Now you can use this since it's separated

import "./globals.css";
import { Header } from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Alert from "./components/ui/Alert/Alert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { authAtom } from "./atom/authAtom";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [user] = useAtom(authAtom);
  const isAdmin = !!user;
  const location = usePathname();
  const isLandingPage = location === "/";

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Theme>
            {!isLandingPage && <Header />}
            <div className={`px-8 ${isAdmin ? "is-admin-user" : ""}`}>
              {children}
            </div>
            <Alert />
            {!isLandingPage && <Footer />}
          </Theme>
        </QueryClientProvider>
      </body>
    </html>
  );
}
