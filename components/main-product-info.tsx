import { TagItem } from '@/components/tag-item';
import { RatingItem } from '@/components/rating-item';
import { FavButton } from '@/components/fav-button';
import { CartButton } from '@/components/cart-button';
import { SingleProductResponse } from '@/store/product';

export const MainProductInfo = ({
  product,
}: {
  product: SingleProductResponse;
}) => {
  return (
    <div className='flex flex-col gap-8 md:gap-10'>
      <div className='flex flex-col gap-4 md:gap-5'>
        <div className='flex items-center gap-2'>
          {product?.tag && <TagItem tag={product?.tag} size='lg' />}
          <RatingItem rating={product.rating} size='lg' />
        </div>
        <div className='flex items-baseline gap-2 max-lg:justify-between'>
          <div className='flex flex-col gap-1'>
            <h4 className='text-xl font-medium text-blue md:text-2xl'>
              {product.name}
            </h4>
            <span
              className={`${product?.quantity > 0 ? 'text-green-500' : 'text-red-500'} text-[10px] font-medium`}
            >
              {product?.quantity > 0 ? 'В наличии' : 'Товар закончился'}
            </span>
            <p className='text-sm font-medium text-blue/65'>
              {product.brand.name}
            </p>
          </div>
          <FavButton />
        </div>
        <CartButton price={product.price} className='xs:max-w-[160px]' />
      </div>
      <p className='max-w-[560px] text-sm text-text-dark'>
        {product.description}
      </p>
    </div>
  );
};
