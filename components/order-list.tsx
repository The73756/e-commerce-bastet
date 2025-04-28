import { OrderItem } from '@/components/order-item';

export const OrderList = () => {
  return (
    <div className='flex flex-col gap-4 md:gap-5'>
      {[1, 2, 3, 4].map((order) => (
        <OrderItem key={order} />
      ))}
    </div>
  );
};
