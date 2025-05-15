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
import { useCatalogStore } from '@/store/catalog';
import { useProductStore } from '@/store/product';
import { useSearchStore } from '@/store/search';
import { LoaderBlock } from '@/components/shared/loader-block';
import Image from 'next/image';
import { pluralize } from '@/lib/utils';

export default function Page() {
  const searchTerm = useSearchStore((state) => state.term);
  const productsLoading = useProductStore((state) => state.isLoading);
  const products = useProductStore((state) => state.products);
  const productsCount = useProductStore((state) => state.count);

  const setSort = useSortStore((state) => state.setSort);
  const setBrand = useCatalogStore((state) => state.setSelectedBrand);
  const setType = useProductStore((state) => state.setActiveTypeId);
  const getAllProducts = useProductStore((state) => state.getAllProducts);

  useEffect(() => {
    setSort(null);
    setBrand(null);
    setType(null);

    getAllProducts({
      search: searchTerm,
    });
  }, [searchTerm]);

  return (
    <div className='flex h-full flex-col gap-5'>
      <div className='gap-1.25 flex flex-col'>
        <CustomTitle title='Результаты поиска' />
        <p className='text-sm font-semibold text-grey'>
          {productsCount}
          {pluralize(productsCount, [
            ' результат',
            ' результата',
            ' результатов',
          ])}
        </p>
      </div>
      {Boolean(products?.length) && (
        <>
          <SortSelect />
          <BrandFilter />
        </>
      )}
      {products?.length && !productsLoading ? (
        <CatalogProductList />
      ) : (
        <div className='my-auto flex flex-col items-center justify-center gap-2'>
          <CustomTitle
            className='items-center'
            title='Ничего не найдено'
            desc='Попробуйте изменить поиск'
          />

          <Image
            src={'/not-found.svg'}
            alt=''
            aria-hidden={true}
            width={150}
            height={150}
          />
        </div>
      )}

      {productsLoading && <LoaderBlock />}
    </div>
  );
}
