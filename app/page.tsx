import { ProductListWithTitle } from '@/components/product-list-with-title';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductLgCard } from '@/components/product-lg-card';

export default function Home() {
  return (
    <>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='mb-8 ml-4'
      >
        <CarouselPrevious className='left-1 z-[2] disabled:hidden' />
        <CarouselContent>
          {[1, 2, 3].map((prod) => (
            <CarouselItem
              className='basis-full sm:basis-4/5 lg:basis-3/5 xl:basis-2/5'
              key={prod}
            >
              <ProductLgCard />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className='right-1 disabled:hidden' />
      </Carousel>
      <div className='container flex flex-col gap-5'>
        <ProductListWithTitle title='Товары дня' />
        <ProductListWithTitle title='Успейте купить' />
      </div>
    </>
  );
}
