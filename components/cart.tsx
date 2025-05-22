'use client';
import { CustomTitle } from '@/components/ui/custom-title';
import { useBasketStore } from '@/store/basket';
import { CartItem } from '@/components/cart-item';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatPrice } from '@/lib/format-price';
import { toast } from 'sonner';
import { CustomModal } from '@/components/ui/custom-modal';
import { useEffect, useState } from 'react';
import { CreateOrder } from '@/components/create-order';
import { useOrderStore } from '@/store/order';

export const Cart = () => {
  const basketItems = useBasketStore((state) => state.items);
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const getAllOrderTypes = useOrderStore((state) => state.getAllOrderTypes);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllOrderTypes();
  }, []);

  const handleClearBasket = async () => {
    const { success, data } = await clearBasket();
    if (success) {
      toast(data?.message);
    }
  };

  return (
    <div className='relative flex h-full flex-col overflow-y-auto overflow-x-hidden pr-3'>
      <CustomTitle
        className='mb-5'
        title={<Link href='/'>Корзина</Link>}
        desc={`${basketItems?.length} товаров`}
      />
      {basketItems.length === 0 && (
        <p className='absolute top-1/2 w-full text-center text-sm font-semibold text-grey'>
          Добавьте товары для покупки
        </p>
      )}
      {basketItems.length > 0 && (
        <>
          <div className='flex flex-col gap-5'>
            {basketItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className='mt-auto'>
            <div className='mt-5 flex items-baseline gap-5'>
              <h4 className='text-sm font-bold text-text-dark'>Итого</h4>
              <p className='font-bold text-blue'>
                {formatPrice(
                  basketItems.reduce((sum, item) => {
                    return sum + item.product.price * item.count;
                  }, 0),
                )}
              </p>
            </div>
            <CustomModal
              open={open}
              setOpen={setOpen}
              trigger={
                <Button size='lg' className='mt-2 h-[40px] w-full py-2.5'>
                  Заказать
                </Button>
              }
              title='Оформление заказа'
              content={<CreateOrder setOpen={setOpen} />}
            />
          </div>
        </>
      )}
    </div>
  );
};
