import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProductGroups } from '@/api/product';
import { ProductGroupWrapper } from '@/components/ui/product-group-wrapper';

export default async function Home() {
  const groupsResponse = await getProductGroups();

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex h-[260px] justify-end rounded-2xl border border-b-slate-100 bg-[url(/banner-bg.png)] bg-center'>
        <div className='relative flex w-1/2 min-w-64 items-center justify-center rounded-2xl bg-white p-2 shadow-custom'>
          <div className='absolute left-2.5 top-2.5 rounded-xl bg-blue px-1.5 py-1 text-sm font-semibold text-white md:text-base'>
            на 1-ый заказ
          </div>
          <h2 className='text-4xl font-bold text-blue md:text-6xl'>-15%</h2>
          <Button
            asChild
            size='lg'
            className='absolute bottom-5 left-1/2 h-[40px] w-[calc(100%-20px)] -translate-x-1/2 md:w-[212px]'
          >
            <Link href='/catalog'>В каталог</Link>
          </Button>
        </div>
      </div>
      {groupsResponse.data && (
        <ProductGroupWrapper groups={groupsResponse.data} />
      )}
    </div>
  );
}
