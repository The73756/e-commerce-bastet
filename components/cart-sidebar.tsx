'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUserStore } from '@/store/user';
import { BasketProduct } from '@/types/basket';
import { useBasketStore } from '@/store/basket';
import { useEffect } from 'react';
import { Cart } from '@/components/cart';
import { Skeleton } from '@/components/ui/skeleton';
import { useLoadingStore } from '@/store/loading';

export function CartSidebar({
  basket,
  basketId,
}: {
  basket: BasketProduct[] | null | undefined;
  basketId: number | undefined;
}) {
  const isAuth = useUserStore((state) => state.isAuth);
  const pageLoading = useLoadingStore((state) => state.loading);
  const setBasketItems = useBasketStore((state) => state.setBasketItems);
  const setCurrentBasketId = useBasketStore(
    (state) => state.setCurrentBasketId,
  );

  useEffect(() => {
    if (basket) setBasketItems(basket);
    if (basketId) setCurrentBasketId(basketId);
  }, [basket, basketId, setBasketItems, setCurrentBasketId]);

  return (
    <div
      id='basket'
      className='fixed bottom-0 right-0 top-[88px] z-10 w-[228px] p-2 max-md:hidden'
    >
      {pageLoading ? (
        <div className='relative h-full overflow-hidden rounded-2xl bg-white p-4 pr-1'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-7 w-[180px]' />
            <Skeleton className='h-3 w-20' />
            <div className='mt-5 space-y-3'>
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className='h-24 w-[calc(100%-12px)]' />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='relative h-full overflow-hidden rounded-2xl bg-white p-4 pr-1'>
          {isAuth ? (
            <Cart />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <div className='absolute left-0 right-0 top-0 w-full rounded-2xl p-4 text-base font-semibold text-blue shadow-custom'>
                Bastet - лучший выбор в мире электроники
              </div>
              <p className='w-full text-center text-sm font-semibold text-grey'>
                Корзина доступна только авторизованным пользователям
              </p>
              <div className='absolute bottom-0 left-0 right-0 flex w-full flex-col gap-4 rounded-2xl p-4 text-sm font-semibold text-grey-dark shadow-custom'>
                <h4>Войдите, чтобы положить товар в корзину</h4>
                <Button size='lg' className='h-[40px] w-full py-2.5' asChild>
                  <Link href=''>Войти</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
