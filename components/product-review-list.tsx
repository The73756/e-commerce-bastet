import { RatingItem } from '@/components/rating-item';
import { ProductReview } from '@/components/product-review';

export const ProductReviewList = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <div className='flex items-center gap-2.5'>
        <h3 className='text-xl font-medium text-blue'>Отзывы</h3>
        <RatingItem rating={{ rate: 4.7 }} size='sm' />
      </div>
      {[1, 2, 3, 4, 5].map((review) => (
        <ProductReview key={review} />
      ))}
    </div>
  );
};
