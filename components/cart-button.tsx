'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { formatPrice } from '@/lib/format-price';
import { ComponentPropsWithoutRef } from 'react';
import { Product } from '@/types/product';
import { useBasketStore } from '@/store/basket';

interface CartButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  product: Product;
  className?: string;
  cart?: boolean;
}

export const CartButton = ({
  product,
  className,
  cart,
  ...props
}: CartButtonProps) => {
  const basketItems = useBasketStore((state) => state.items);
  const addToBasket = useBasketStore((state) => state.addToBasket);
  const updateBasketItem = useBasketStore((state) => state.updateBasketItem);
  const removeFromBasket = useBasketStore((state) => state.removeFromBasket);

  const currentItem = basketItems?.find(
    (item) => item?.productId === product?.id,
  );

  const add = async () => {
    if (currentItem) return;

    await addToBasket(product.id);
  };

  const increment = async () => {
    if (!currentItem) return;

    await updateBasketItem(currentItem?.id, currentItem?.count + 1);
  };

  const decrement = async () => {
    if (!currentItem) return;

    if (currentItem?.count === 1) return await removeFromBasket(currentItem.id);

    await updateBasketItem(currentItem?.id, currentItem?.count - 1);
  };

  return (
    <Button
      {...props}
      onClick={add}
      className={`${className} h-9 w-full min-w-[100px]`}
    >
      {currentItem ? (
        <div className='flex w-full items-center justify-between'>
          <button onClick={decrement}>
            <Icon name='shared/minus' />
          </button>

          {cart ? (
            <span>{currentItem?.count}</span>
          ) : (
            <div className='flex h-6 flex-col items-center justify-center text-xs'>
              <span>
                {formatPrice(product?.price * (currentItem?.count || 1))}
              </span>
              <span className='text-[10px]'>{currentItem?.count} шт</span>
            </div>
          )}

          <button
            onClick={increment}
            disabled={currentItem.count === product?.quantity}
            className='relative disabled:opacity-50'
          >
            {currentItem.count === product?.quantity && (
              <span className='absolute -right-1 -top-6 text-[10px] text-text'>
                Товар закончился
              </span>
            )}
            <Icon name='shared/plus' />
          </button>
        </div>
      ) : (
        <>
          <span>{formatPrice(product?.price)}</span>
          <Icon name='shared/cart' />
        </>
      )}
    </Button>
  );
};
