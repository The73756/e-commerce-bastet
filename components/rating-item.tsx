import { Icon } from '@/components/shared/icon';

export const RatingItem = ({
  rating,
  size,
  className,
}: {
  rating: { rate: number };
  size: 'sm' | 'lg';
  className?: string;
}) => {
  return (
    <div
      className={`${size === 'sm' ? 'rounded-md px-1 py-0.5 text-[10px]' : 'rounded-lg'} flex items-center gap-1 bg-primary px-1.5 py-1 text-white ${className}`}
    >
      <Icon
        name='shared/rating'
        className={`text-yellow-300 ${size === 'sm' ? 'text-xs' : 'text-base'}`}
      />
      <span>{rating.rate}</span>
    </div>
  );
};
