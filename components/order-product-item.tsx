import Image from 'next/image';
import { formatPrice } from '@/lib/format-price';
import { API_URL } from '@/lib/consts';
import { OrderProduct } from '@/types/order';
import Link from 'next/link';

export const OrderProductItem = ({ item }: { item: OrderProduct }) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex aspect-square min-w-14 overflow-hidden rounded-xl border border-[#EDEDED]'>
        <Image
          src={`${API_URL?.replace('api/', '')}/${item.product?.photos[0].url}`}
          alt={item.product?.name}
          width={60}
          height={60}
          className='object-contain'
        />
      </div>
      <div className='text-sm text-blue'>
        <Link href={`/product/${item.product?.id}`}>
          <h5 className='line-clamp-1 font-medium'>{item.product?.name}</h5>
        </Link>
        <p className='max-md:text-[10px]'>{item.count} шт</p>
        <p className='font-semibold'>
          {formatPrice(item.product?.price * item.count)}
        </p>
      </div>
    </div>
  );
};
