'use client';
import { OrderItem } from '@/components/order-item';
import { useEffect } from 'react';
import { useOrderStore } from '@/store/order';
import { useUserStore } from '@/store/user';

export const OrderList = () => {
  const getAllOrdersOfUser = useOrderStore((state) => state.getAllOrdersOfUser);
  const orders = useOrderStore((state) => state.orders);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) getAllOrdersOfUser(user.id);
  }, []);

  return (
    <div className='flex flex-col gap-4 md:gap-5'>
      {orders?.map((order) => <OrderItem key={order.id} order={order} />)}
    </div>
  );
};
