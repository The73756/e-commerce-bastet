'use client';
import { ProfileInfo } from '@/components/profile-info';
import { ProfileTabs } from '@/components/profile-tabs';
import { useLoadingStore } from '@/store/loading';
import { Skeleton } from '@/components/ui/skeleton';

export const ProfilePage = () => {
  const pageLoading = useLoadingStore((state) => state.loading);

  return pageLoading ? (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-7 w-[180px]' />
      <Skeleton className='h-24 w-full rounded-2xl' />
      <div className='mt-5 flex gap-2'>
        {[1, 2].map((item) => (
          <Skeleton key={item} className='h-8 w-24 rounded-2xl' />
        ))}
      </div>
      <div className='space-y-3'>
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className='h-[300px] w-full rounded-2xl' />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col gap-10'>
      <ProfileInfo />
      <ProfileTabs />
    </div>
  );
};
