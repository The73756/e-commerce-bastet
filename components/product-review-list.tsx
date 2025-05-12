import { RatingItem } from '@/components/rating-item';
import { ProductReview } from '@/components/product-review';
import { Rating } from '@/types/product';

export const ProductReviewList = ({
  ratings,
  totalRating,
}: {
  ratings: Rating[];
  totalRating: number;
}) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <div className='flex items-center gap-2.5'>
        <h3 className='text-xl font-medium text-blue'>Отзывы</h3>
        <RatingItem rating={totalRating} size='sm' />
      </div>
      {ratings.map((review) => (
        <ProductReview key={review.id} review={review} />
      ))}
    </div>
  );
};
