'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { OrderType } from '@/types/order';
import { formatPrice } from '@/lib/format-price';
import { useBasketStore } from '@/store/basket';
import { useOrderStore } from '@/store/order';
import { useUserStore } from '@/store/user';

export function CreateOrderForm({
  setOpen,
  selectedOrderType,
}: {
  setOpen: (open: boolean) => void;
  selectedOrderType: OrderType;
}) {
  const basketItems = useBasketStore((state) => state.items);
  const createOrder = useOrderStore((state) => state.createOrder);
  const user = useUserStore((state) => state.user);
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const setOrders = useOrderStore((state) => state.setOrders);
  const orders = useOrderStore((state) => state.orders);

  async function onSubmit() {
    if (!user) return;

    const orderData = {
      userId: user?.id,
      orderTypeId: selectedOrderType.id,
      orderStatusId: 1,
      price:
        basketItems.reduce((sum, item) => {
          return sum + item.product.price * item.count;
        }, 0) + selectedOrderType.price,
      street: 'Ленина',
      house: '21',
      appartament: '',
      intercom: false,
      phone: user?.phone,
      date: new Date(),
      time: '00:00',
      products: basketItems,
    };

    const { success, data, error } = await createOrder(orderData);

    if (success && data) {
      await clearBasket();
      setOpen(false);

      console.log(data);
      if (orders) {
        setOrders([...orders, data]);
      } else {
        setOrders([data]);
      }
      toast(`Заказ успешно создан`);
    }
    if (error) toast(error.message);
  }

  return (
    <div className='flex flex-col gap-2.5'>
      <div className='my-2 flex flex-col gap-2'>
        <h4 className='text-sm opacity-70'>
          Вы можете получить заказ по адресу:
        </h4>
        <p className='font-bold text-blue'>г. Кисловодск, ул. Ленина, 21</p>
      </div>
      <div className='mt-2.5 flex items-center justify-between'>
        <div className='flex items-baseline gap-5'>
          <h4 className='text-sm font-bold text-text-dark'>Итого</h4>
          <p className='font-bold text-blue'>
            {formatPrice(
              basketItems.reduce((sum, item) => {
                return sum + item.product.price * item.count;
              }, 0) + selectedOrderType.price,
            )}
          </p>
        </div>
        <Button
          className='h-10 w-1/2 justify-center font-semibold'
          onClick={onSubmit}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}
