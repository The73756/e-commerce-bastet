import { CustomTitle } from '@/components/ui/custom-title';
import Link from 'next/link';
import { useBasketStore } from '@/store/basket';
import { CartItem } from '@/components/cart-item';

export const Cart = () => {
  const basketItems = useBasketStore((state) => state.items);

  return (
    <div className='h-full overflow-y-auto pr-3'>
      <CustomTitle
        className='mb-5'
        title={<Link href='/'>Корзина</Link>}
        desc={`${basketItems?.length} товаров`}
      />
      <div className='flex flex-col gap-5'>
        {basketItems.length > 0 &&
          basketItems.map((item) => <CartItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};
