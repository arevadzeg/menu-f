import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Home from './Home';

export default function YLE() {
  const queryClient = new QueryClient();

  return (
    <div id="landing-page">

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home />
      </HydrationBoundary>

    </div>
  );
}
