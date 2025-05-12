import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { formatPrice } from '@/lib/format-price';
import { ComponentPropsWithoutRef } from 'react';

interface CartButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  price: number;
  className?: string;
}

export const CartButton = ({ price, className, ...props }: CartButtonProps) => {
  return (
    <Button {...props} className={`${className} w-full`}>
      <span>{formatPrice(price)}</span>
      <Icon name='shared/cart' />
    </Button>
  );
};
