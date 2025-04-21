import { Button } from '@/components/ui/button';
import { CustomTitle } from '@/components/ui/custom-title';
import { ProductCard } from '@/components/product-card';

export default function Home() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex h-[260px] justify-end rounded-2xl border border-b-slate-100 bg-[url(/banner-bg.png)] bg-center'>
        <div className='shadow-custom relative flex w-1/2 min-w-64 items-center justify-center rounded-2xl bg-white p-2'>
          <div className='bg-blue absolute left-2.5 top-2.5 rounded-xl px-1.5 py-1 text-base font-semibold text-white'>
            на 1-ый заказ
          </div>
          <h2 className='text-blue text-4xl font-bold md:text-6xl'>-15%</h2>
          <Button
            size='lg'
            className='absolute bottom-5 left-1/2 h-[40px] w-[212px] max-w-full -translate-x-1/2'
          >
            В каталог
          </Button>
        </div>
      </div>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className='flex flex-col gap-2.5'>
          <CustomTitle title='Смартфоны' />
          <div className='grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-2.5'>
            {[1, 2, 3, 4, 5].map((prod) => (
              <ProductCard key={prod} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
