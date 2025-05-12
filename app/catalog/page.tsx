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
import { getAllProducts } from '@/api/product';

export default async function Page() {
  const allProductResponse = await getAllProducts();

  return (
    <div className='flex flex-col gap-5'>
      <CustomTitle title='Смартфоны' />
      <SortSelect />
      <BrandFilter />
      {allProductResponse.data && (
        <CatalogProductList productData={allProductResponse.data} />
      )}
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
