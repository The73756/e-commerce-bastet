import Image from 'next/image';
import { CartButton } from '@/components/cart-button';
import { FavButton } from '@/components/fav-button';

const product = {
  title: 'Холодильник Side by Side by Side Aceline Aceline',
  price: 39499,
};

export const ProductCard = () => {
  return (
    <div className='relative overflow-hidden rounded-2xl bg-primary'>
      <div className='flex justify-center rounded-2xl bg-white'>
        <Image
          src='https://www.belaya-tehnika.ru/images/watermarked/1/detailed/10/%D0%A5%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA_%D0%9C%D0%98%D0%A0-POZIS_RK_139.jpg'
          alt={product.title}
          width={110}
          height={110}
          className='h-full object-contain'
        />
      </div>
      <div className='absolute right-1 top-1'>
        <FavButton />
      </div>
      <div className='flex flex-col gap-2 bg-primary px-2.5 pb-2.5'>
        <h4 className='line-clamp-2 text-xl font-semibold text-background'>
          {product.title}
        </h4>
        <CartButton price={product.price} />
      </div>
    </div>
  );
};
