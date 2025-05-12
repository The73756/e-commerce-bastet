'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CustomTitle } from '@/components/ui/custom-title';
import { useUserStore } from '@/store/user';

export function CartSidebar() {
  const isAuth = useUserStore((state) => state.isAuth);

  return (
    <div
      id='basket'
      className='fixed bottom-0 right-0 top-[88px] z-10 w-[228px] p-2 max-md:hidden'
    >
      <div className='relative h-full overflow-hidden rounded-2xl bg-white p-4'>
        {isAuth ? (
          <CustomTitle
            className='mb-5'
            title={<Link href='/'>Корзина</Link>}
            desc={`5 товаров`}
          />
        ) : (
          <div className='flex h-full items-center justify-center'>
            <div className='absolute top-0 w-full rounded-2xl p-4 text-base font-semibold text-blue shadow-custom'>
              Bastet - лучший выбор в мире электроники
            </div>
            <p className='w-full text-center text-sm font-semibold text-grey'>
              Корзина доступна только авторизованным пользователям
            </p>
            <div className='absolute bottom-0 flex w-full flex-col gap-4 rounded-2xl p-4 text-sm font-semibold text-grey-dark shadow-custom'>
              <h4>Войдите, чтобы положить товар в корзину</h4>
              <Button size='lg' className='h-[40px] w-full py-2.5' asChild>
                <Link href=''>Войти</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
