import Image from 'next/image';
import { CartButton } from '@/components/cart-button';
import { FavButton } from '@/components/fav-button';
import Link from 'next/link';
import { TagItem } from '@/components/tag-item';
import { RatingItem } from '@/components/rating-item';
import { Product } from '@/types/product';
import { API_URL } from '@/lib/consts';

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className='relative overflow-hidden rounded-xl bg-white shadow-custom'>
      <div className='relative flex min-h-[110px] items-center justify-center rounded-xl border-b border-slate-100 bg-white'>
        <Image
          src={`${API_URL?.replace('api/', '')}/${product?.photos[0].url}`}
          alt={product?.name}
          width={110}
          height={110}
          className='h-full object-contain'
        />
        {product?.tag && (
          <TagItem
            tag={product?.tag}
            size='sm'
            className='absolute left-1.5 top-1.5'
          />
        )}
        <RatingItem
          rating={product?.rating}
          size='sm'
          className='absolute bottom-1.5 left-1.5'
        />
      </div>
      <div className='flex items-center justify-between gap-2 px-2.5 pt-1.5'>
        <span
          className={`${product?.quantity > 0 ? 'text-green-500' : 'text-red-500'} text-[10px] font-medium`}
        >
          {product?.quantity > 0 ? 'В наличии' : 'Товар закончился'}
        </span>
        <FavButton />
      </div>
      <div className='flex flex-col gap-2 bg-white px-2.5 pb-2.5'>
        <Link href={`/product/${product?.id}`}>
          <h4 className='line-clamp-2 text-sm font-medium text-blue'>
            {product?.name}
          </h4>
        </Link>
        <p className='text-xs font-medium text-blue/65'>
          {product?.brand.name}
        </p>
        <CartButton disabled={!product?.quantity} price={product?.price} />
      </div>
    </div>
  );
};
