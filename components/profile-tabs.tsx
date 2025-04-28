import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderList } from '@/components/order-list';
import { ProductCard } from '@/components/product-card';

export const ProfileTabs = () => {
  return (
    <Tabs defaultValue='orders' className='w-full'>
      <TabsList className='gap-2.5'>
        <TabsTrigger value='orders'>Заказы</TabsTrigger>
        <TabsTrigger value='favorite'>Избранное</TabsTrigger>
      </TabsList>
      <TabsContent value='orders'>
        <OrderList />
      </TabsContent>
      <TabsContent value='favorite'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
          {[1, 2, 3, 4, 5, 6, 7].map((prod) => (
            <ProductCard key={prod} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
