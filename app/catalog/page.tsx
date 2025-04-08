import { ProductCard } from '@/components/product-card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { BrandFilter } from '@/components/brand-filter';
import { SortSelect } from '@/components/sort-select';

export default function Page() {
  return (
    <div className='container -mt-8'>
      <SortSelect />
      <BrandFilter />
      <div className='mb-14 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((prod) => (
          <ProductCard key={prod} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === 3} href='#'>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
