import { Icon } from '@/components/shared/icon';

const review = {
  rate: 4,
  user: { name: 'Иванов Иван' },
  comment: 'Lorem ipsum dolor sit amet',
  date: '3 aпр 2025',
};

export const ProductReview = () => {
  return (
    <div className='flex flex-col gap-5 rounded-2xl p-5 shadow-custom'>
      <div className='flex items-baseline justify-between gap-5'>
        <div className='5 flex flex-col gap-2'>
          <h4 className='text-sm font-medium text-blue'>{review.user.name}</h4>
          <div className='flex gap-1'>
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name='shared/rating'
                className={`${index < review.rate ? 'text-yellow-300' : 'text-text'}`}
              />
            ))}
          </div>
        </div>
        <span className='text-xs text-text-dark'>{review.date}</span>
      </div>
      <p className='text-sm text-text-dark'>{review.comment}</p>
    </div>
  );
};
