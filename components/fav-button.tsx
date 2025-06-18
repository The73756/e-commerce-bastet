'use client';
import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useFavoriteStore } from '@/store/favorite';

export const FavButton = ({ product }: { product: Product }) => {
  const favoriteItems = useFavoriteStore((state) => state.items);
  const addToFavorite = useFavoriteStore((state) => state.addToFavorite);
  const removeFromFavorite = useFavoriteStore(
    (state) => state.removeFromFavorite,
  );

  const currentItem = favoriteItems?.find(
    (item) => item.productId === product?.id,
  );

  const handler = async () => {
    if (currentItem) {
      return await removeFromFavorite(currentItem.id);
    }

    await addToFavorite(product.id);
  };

  return (
    <Button
      variant='ghost'
      className='h-6 w-6 text-base text-red-500 transition-colors duration-300'
      size='icon'
      onClick={handler}
      aria-label='Добавить в избранное'
    >
      {currentItem ? (
        <Icon name='shared/favourite-full' />
      ) : (
        <Icon name='shared/favourite' />
      )}
    </Button>
  );
};
