import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';

export const FavButton = () => {
  return (
    <Button
      variant='ghost'
      className='h-6 w-6 text-base text-red-500'
      size='icon'
    >
      <Icon name='shared/favourite' />
    </Button>
  );
};
