import Image from 'next/image';
import { CartButton } from '@/components/cart-button';
import { FavButton } from '@/components/fav-button';
import Link from 'next/link';
import { TagItem } from '@/components/tag-item';
import { RatingItem } from '@/components/rating-item';

const product = {
  title: 'Холодильник Side by Side by Side Aceline Aceline',
  price: 39499,
  brand: { title: 'Polaris' },
};

export const ProductCard = () => {
  return (
    <div className='relative overflow-hidden rounded-xl bg-white shadow-custom'>
      <div className='relative flex justify-center rounded-xl border-b border-slate-100 bg-white'>
        <Image
          src='https://www.belaya-tehnika.ru/images/watermarked/1/detailed/10/%D0%A5%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA_%D0%9C%D0%98%D0%A0-POZIS_RK_139.jpg'
          alt={product.title}
          width={110}
          height={110}
          className='h-full object-contain'
        />
        <TagItem
          tag={{ name: 'Новинка' }}
          size='sm'
          className='absolute left-1.5 top-1.5'
        />
        <RatingItem
          rating={{ rate: 4.7 }}
          size='sm'
          className='absolute bottom-1.5 left-1.5'
        />
      </div>
      <div className='flex items-center justify-between gap-2 px-2.5 pt-1.5'>
        <span className='text-[10px] font-medium text-green-500'>
          В наличии
        </span>
        <FavButton />
      </div>
      <div className='flex flex-col gap-2 bg-white px-2.5 pb-2.5'>
        <Link href='/product/1'>
          <h4 className='line-clamp-2 text-sm font-medium text-blue'>
            {product.title}
          </h4>
        </Link>
        <p className='text-xs font-medium text-blue/65'>
          {product.brand.title}
        </p>
        <CartButton price={product.price} />
      </div>
    </div>
  );
};
