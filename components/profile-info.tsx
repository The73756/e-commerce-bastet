'use client';
import { CustomTitle } from '@/components/ui/custom-title';
import { Icon } from '@/components/shared/icon';
import Link from 'next/link';
import { useUserStore } from '@/store/user';

export const ProfileInfo = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className='flex flex-col gap-4 md:gap-5'>
      <CustomTitle title='Профиль' />
      <div className='flex flex-wrap items-center justify-between gap-5 rounded-2xl px-5 py-4 shadow-custom'>
        <div className='flex items-center gap-1.5 font-semibold text-blue'>
          <Icon name='shared/user' />
          <h4 className='text-lg'>
            {user?.surname} {user?.name}
          </h4>
        </div>
        <div className='flex flex-col items-end gap-2.5'>
          <Link
            href={`tel:${user?.phone}`}
            className='flex items-center gap-1.5 text-blue'
          >
            <Icon name='shared/tel' />
            <span className='text-sm font-semibold'>{user?.phone}</span>
          </Link>
          <Link
            href={`mailto:${user?.email}`}
            className='flex items-center gap-1.5 text-blue'
          >
            <Icon name='shared/email' />
            <span className='text-sm font-semibold'>{user?.email}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
