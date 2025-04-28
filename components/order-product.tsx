import Image from 'next/image';
import { formatPrice } from '@/lib/format-price';

const product = {
  title: 'Холодильник Side by Side by Side Aceline Aceline',
  price: 39499,
  brand: { title: 'Polaris' },
  img: 'https://www.belaya-tehnika.ru/images/watermarked/1/detailed/10/%D0%A5%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA_%D0%9C%D0%98%D0%A0-POZIS_RK_139.jpg',
};

export const OrderProduct = () => {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex aspect-square min-w-14 overflow-hidden rounded-xl border border-[#EDEDED]'>
        <Image
          src={product.img}
          alt={product.title}
          width={60}
          height={60}
          className='object-contain'
        />
      </div>
      <div className='text-sm text-blue'>
        <h5 className='line-clamp-1 font-medium'>{product.title}</h5>
        <p className='max-md:text-[10px]'>2 шт</p>
        <p className='font-semibold'>{formatPrice(product.price * 2)}</p>
      </div>
    </div>
  );
};
