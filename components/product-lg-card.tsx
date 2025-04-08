import Image from 'next/image';
import { FavButton } from '@/components/fav-button';
import { CartButton } from '@/components/cart-button';

const product = {
  title: 'Холодильник Side by Side by Side Aceline Aceline',
  price: 39499,
};

export const ProductLgCard = () => {
  return (
    <div className='flex gap-3 overflow-hidden rounded-[20px] bg-primary p-5 max-xs:flex-col'>
      <div className='flex flex-shrink-0 justify-center overflow-hidden rounded-2xl bg-white max-md:aspect-square max-md:w-[100px] max-md:self-center max-xs:aspect-auto max-xs:w-full'>
        <Image
          src='https://www.belaya-tehnika.ru/images/watermarked/1/detailed/10/%D0%A5%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA_%D0%9C%D0%98%D0%A0-POZIS_RK_139.jpg'
          alt={product.title}
          width={152}
          height={144}
          className='h-full object-contain'
        />
      </div>
      <div className='flex flex-col justify-between gap-2 bg-primary'>
        <h4 className='line-clamp-3 text-2xl font-semibold text-background'>
          {product.title}
        </h4>
        <div className='flex items-center gap-3'>
          <CartButton price={product.price} />
          <FavButton />
        </div>
      </div>
    </div>
  );
};
