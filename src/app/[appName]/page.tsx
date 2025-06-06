'use client';

import ProductViewLayout from '../components/layout/ProductViewLayout/ProductViewLayout';
import FilterSort from '../components/product/FilterSort/FilterSort';
import MainCategories from '../components/product/MainCategories/MainCategories';
// import Breadcrumb from '../components/ui/BreadCrumb/BreadCrumb';
// import useBreadcrumbItems from '../hooks/useBreadcrumbItems';
import PrefetchComponent from '../utils/PrefetchComponent';

export default function Page({ searchParams, params }: any) {
  // const items = useBreadcrumbItems();

  // TODO SOME PROPS ARE MISSING AND BREAD CRUMPS
  return (
    <PrefetchComponent searchParams={searchParams} params={params}>
      <div id="main-page">
        {/* <Breadcrumb items={items} /> */}
        <FilterSort />
        <MainCategories />
        <h1 className="text-3xl font-bold mb-6 text-center text-primaryText">
          All Products
        </h1>
        <ProductViewLayout />
      </div>
    </PrefetchComponent>
  );
}
