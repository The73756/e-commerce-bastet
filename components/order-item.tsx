import { formatPrice } from '@/lib/format-price';
import { OrderProduct } from '@/components/order-product';

export const OrderItem = () => {
  return (
    <div className='flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-custom'>
      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-blue'>3 апр 2025</h3>
        <p className='text-sm font-semibold text-grey'>5 товаров</p>
      </div>
      <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
        {[1, 2, 3, 4, 5].map((item) => (
          <OrderProduct key={item} />
        ))}
      </div>
      <div className='flex items-center gap-5 font-semibold text-blue'>
        <h3 className='text-sm'>Итого</h3>
        <p>{formatPrice(39990)}</p>
      </div>
    </div>
  );
};
