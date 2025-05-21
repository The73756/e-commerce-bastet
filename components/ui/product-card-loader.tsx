import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardLoader = () => {
  return (
    <div className='space-y-3'>
      <Skeleton className='h-[110px] rounded-xl' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-2 w-10' />
        <Skeleton className='mt-5 h-8 w-full rounded-2xl' />
      </div>
    </div>
  );
};
