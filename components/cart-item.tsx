import { BasketProduct } from '@/types/basket';
import Image from 'next/image';
import { formatPrice } from '@/lib/format-price';
import { API_URL } from '@/lib/consts';
import { CartButton } from '@/components/cart-button';
import Link from 'next/link';

export const CartItem = ({ item }: { item: BasketProduct }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <div className='flex aspect-square min-w-14 overflow-hidden rounded-xl border border-[#EDEDED]'>
          <Image
            src={
              item.product?.photos[0]?.url
                ? `${API_URL?.replace('api/', '')}/${item.product?.photos[0]?.url}`
                : '/placeholder.png'
            }
            alt={item?.product.name}
            width={60}
            height={60}
            className='object-contain'
          />
        </div>
        <Link
          className='text-sm text-blue'
          href={`/product/${item.product?.id}`}
        >
          <h5 className='line-clamp-1 font-medium'>{item.product.name}</h5>
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        <CartButton cart product={item.product} />
        <p className='text-sm font-semibold text-blue'>
          {formatPrice(item.product.price * item.count)}
        </p>
      </div>
    </div>
  );
};
