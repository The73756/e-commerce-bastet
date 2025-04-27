import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { formatPrice } from '@/lib/format-price';

export const CartButton = ({
  price,
  className,
}: {
  price: number;
  className?: string;
}) => {
  return (
    <Button className={`${className} w-full`}>
      <span>{formatPrice(price)}</span>
      <Icon name='shared/cart' />
    </Button>
  );
};
