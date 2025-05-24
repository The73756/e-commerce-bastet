'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderList } from '@/components/order-list';
import { ProductCard } from '@/components/product-card';
import { useBasketStore } from '@/store/basket';
import { useSearchParams } from 'next/navigation';
import { useFavoriteStore } from '@/store/favorite';

export const ProfileTabs = () => {
  const basketItems = useBasketStore((state) => state.items);
  const favoriteItems = useFavoriteStore((state) => state.items);

  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tabs');

  return (
    <Tabs defaultValue={defaultTab || 'orders'} className='w-full'>
      <TabsList className='gap-2.5'>
        <TabsTrigger value='orders'>Заказы</TabsTrigger>
        <TabsTrigger value='favorite'>Избранное</TabsTrigger>
        <TabsTrigger className='md:hidden' value='cart'>
          Корзина
        </TabsTrigger>
      </TabsList>
      <TabsContent value='orders'>
        <OrderList />
      </TabsContent>
      <TabsContent className='relative' value='favorite'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
          {favoriteItems.length > 0 &&
            favoriteItems.map((prod) => (
              <ProductCard key={prod.id} product={prod.product} />
            ))}
          {favoriteItems.length === 0 && (
            <p className='absolute top-1/2 mt-5 w-full text-center text-sm font-semibold text-grey'>
              Вы еще не добавляли товары в избранное
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent className='relative md:hidden' value='cart'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
          {basketItems.length > 0 &&
            basketItems.map((prod) => (
              <ProductCard key={prod.id} product={prod.product} />
            ))}
          {basketItems.length === 0 && (
            <p className='absolute top-1/2 mt-5 w-full text-center text-sm font-semibold text-grey'>
              Добавьте товары для покупки
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
