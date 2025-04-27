import { TagItem } from '@/components/tag-item';
import { RatingItem } from '@/components/rating-item';
import { FavButton } from '@/components/fav-button';
import { CartButton } from '@/components/cart-button';

const product = {
  title: 'Холодильник Side by Side by Side Aceline Aceline',
  price: 39499,
  brand: { title: 'Polaris' },
  desc: 'Кофемашина автоматическая Philips EP2231/40 оснащена сенсорным дисплеем, который открывает доступ к функционалу. Капучинатор превращает молоко в густую пенку, позволяя насладиться вкусом любимого латте. Система оснащена сенсорным дисплеем, который открывает доступ к функционалу. Капучинатор превращает молоко в густую пенку, позволяя насладиться вкусом любимого латте. Система оснащена сенсорным дисплеем, который открывает доступ к функционалу. Капучинатор превращает молоко в густую пенку.',
};

export const MainProductInfo = () => {
  return (
    <div className='flex flex-col gap-8 md:gap-10'>
      <div className='flex flex-col gap-4 md:gap-5'>
        <div className='flex items-center gap-2'>
          <TagItem tag={{ name: 'Новинка' }} size='lg' />
          <RatingItem rating={{ rate: 4.7 }} size='lg' />
        </div>
        <div className='flex items-baseline gap-2 max-lg:justify-between'>
          <div className='flex flex-col gap-1'>
            <h4 className='text-xl font-medium text-blue md:text-2xl'>
              {product.title}
            </h4>
            <span className='text-[10px] font-medium text-green-500'>
              В наличии
            </span>
            <p className='text-sm font-medium text-blue/65'>
              {product.brand.title}
            </p>
          </div>
          <FavButton />
        </div>
        <CartButton price={product.price} className='xs:max-w-[160px]' />
      </div>
      <p className='max-w-[560px] text-sm text-text-dark'>{product.desc}</p>
    </div>
  );
};
