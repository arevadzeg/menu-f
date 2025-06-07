import PrefetchComponent from '../utils/PrefetchComponent';
import PageClientComponent from './PageClientComponent';

export default function Page({ searchParams, params }: any) {
  return (
    <PrefetchComponent searchParams={searchParams} params={params}>
      <PageClientComponent />
    </PrefetchComponent>
  );
}
