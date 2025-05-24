'use client';
import { CustomTitle } from '@/components/ui/custom-title';
import { Icon } from '@/components/shared/icon';
import Link from 'next/link';
import { useUserStore } from '@/store/user';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useFavoriteStore } from '@/store/favorite';
import { useBasketStore } from '@/store/basket';

export const ProfileInfo = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const logoutFav = useFavoriteStore((state) => state.clearFavorite);
  const logoutBasket = useBasketStore((state) => state.clearBasketOnLogout);
  const router = useRouter();

  return (
    <div className='flex flex-col gap-4 md:gap-5'>
      <div className='flex items-center justify-between gap-5'>
        <CustomTitle title='Профиль' />
        <Button
          onClick={() => {
            logout();
            logoutFav();
            logoutBasket();
            router.push('/');
          }}
          size='sm'
          variant='destructive'
        >
          Выйти
        </Button>
      </div>
      <div className='flex justify-between gap-5 rounded-2xl px-5 py-4 shadow-custom max-xs:flex-col xs:flex-wrap xs:items-center'>
        <div className='flex items-center gap-1.5 font-semibold text-blue'>
          <Icon name='shared/user' />
          <h4 className='text-lg'>
            {user?.surname} {user?.name}
          </h4>
        </div>
        <div className='flex flex-col gap-2.5 xs:items-end'>
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
