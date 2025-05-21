'use client';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';
import { BrandFilter } from '@/components/brand-filter';
import { SortSelect } from '@/components/sort-select';
import { CustomTitle } from '@/components/ui/custom-title';
import { CatalogProductList } from '@/components/catalog-product-list';
import { useEffect } from 'react';
import { useSortStore } from '@/store/sort';
import { useProductStore } from '@/store/product';
import { useCatalogStore } from '@/store/catalog';

export default function Page() {
  const setSort = useSortStore((state) => state.setSort);
  const getAllProducts = useProductStore((state) => state.getAllProducts);
  const setSelectedBrand = useCatalogStore((state) => state.setSelectedBrand);
  const setActiveTypeId = useProductStore((state) => state.setActiveTypeId);

  useEffect(() => {
    setSort(null);
    setSelectedBrand(null);
    setActiveTypeId(null);
    getAllProducts();
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <CustomTitle title='Каталог' />
      <SortSelect />
      <BrandFilter />
      <CatalogProductList />

      {/*<Pagination>*/}
      {/*  <PaginationContent>*/}
      {/*    <PaginationItem>*/}
      {/*      <PaginationPrevious href='#' />*/}
      {/*    </PaginationItem>*/}
      {/*    {[1, 2, 3, 4, 5, 6, 7].map((page) => (*/}
      {/*      <PaginationItem key={page}>*/}
      {/*        <PaginationLink isActive={page === 3} href='#'>*/}
      {/*          {page}*/}
      {/*        </PaginationLink>*/}
      {/*      </PaginationItem>*/}
      {/*    ))}*/}
      {/*    <PaginationItem>*/}
      {/*      <PaginationNext href='#' />*/}
      {/*    </PaginationItem>*/}
      {/*  </PaginationContent>*/}
      {/*</Pagination>*/}
    </div>
  );
}
