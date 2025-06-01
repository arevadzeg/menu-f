'use client';

import { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import Header from '../components/layout/Header/Header';
import LayoutDnDWrapper from '../LayoutDnDWrapper';
import Alert from '../components/ui/Alert/Alert';
import Footer from '../components/layout/Footer/Footer';
import authAtom from '../atom/authAtom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function Provider({ children }: { children: ReactNode }) {
  const [user] = useAtom(authAtom);
  const isAdmin = !!user?.isTurnUserMode;
  const location = usePathname();
  const isLandingPage = location === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

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
    </QueryClientProvider>
  );
}
