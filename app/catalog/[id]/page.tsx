'use client';

import { CatalogProductList } from '@/components/catalog-product-list';
import { CatalogTitle } from '@/components/catalog-title';
import { useProductStore } from '@/store/product';
import { useEffect } from 'react';
import { useCatalogStore } from '@/store/catalog';
import { LoaderBlock } from '@/components/shared/loader-block';
import { useSortStore } from '@/store/sort';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const productsLoading = useProductStore((state) => state.isLoading);

  const brand = useCatalogStore((state) => state.selectedBrand);

  const getAllProducts = useProductStore((state) => state.getAllProducts);
  const setActiveTypeId = useProductStore((state) => state.setActiveTypeId);
  const setSort = useSortStore((state) => state.setSort);

  useEffect(() => {
    setSort(null);
    setActiveTypeId(id);
    getAllProducts({
      typeId: id,
      brandId: brand?.id,
    });
  }, [brand]);

  return (
    <div className='flex flex-col gap-5'>
      <CatalogTitle typeId={id}></CatalogTitle>
      <CatalogProductList />

      {productsLoading && <LoaderBlock />}
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
