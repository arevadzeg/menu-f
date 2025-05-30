'use client';

import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { authAtom } from './atom/authAtom';
import Alert from './components/ui/Alert/Alert';
import Footer from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header/Header';
import LayoutDnDWrapper from './LayoutDnDWrapper';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user] = useAtom(authAtom);
  const isAdmin = !!user?.isTurnUserMode;
  const location = usePathname();
  const isLandingPage = location === '/';

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Theme>
            {!isLandingPage && <Header />}
            <div
              className={`${isAdmin ? 'is-admin-user' : ''} ${isLandingPage ? '' : 'p-4'}`}
            >
              {isAdmin ? (
                <LayoutDnDWrapper>{children}</LayoutDnDWrapper>
              ) : (
                children
              )}
            </div>
            <Alert />
            {!isLandingPage && <Footer />}
          </Theme>
        </QueryClientProvider>
      </body>
    </html>
  );
}
