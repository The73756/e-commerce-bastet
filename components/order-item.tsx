import { formatPrice } from '@/lib/format-price';
import { OrderProductItem } from '@/components/order-product-item';
import { Order } from '@/types/order';
import { formatDate } from '@/lib/format-date';
import { pluralize } from '@/lib/utils';

export const OrderItem = ({ order }: { order: Order }) => {
  return (
    <div className='flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-custom'>
      <div className='flex flex-wrap items-start justify-between gap-5'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-semibold text-blue'>
            Заказ №{order.id}{' '}
            <span className='text-sm font-medium'>
              от {formatDate(order?.createdAt)}
            </span>
          </h2>
          <p className='text-sm font-semibold text-grey'>{`${order.products.length} ${pluralize(order.products.length || 0, ['товар', 'товара', 'товаров'])}`}</p>
          {order.orderType.id === 1 && (
            <p className='mt-2 text-sm font-medium text-blue'>
              Дата и время доставки: {formatDate(order.date)}{' '}
              {order.time && order.time?.substring(0, 5)}
            </p>
          )}
        </div>
        <div
          className={`rounded-xl px-1.5 py-1 text-white ${order.orderStatus.id === 1 ? 'bg-indigo-500' : order.orderStatus.id === 2 || order.orderStatus.id === 3 ? 'bg-green-500' : order.orderStatus.id === 4 ? 'bg-slate-500' : order.orderStatus.id === 5 ? 'bg-red-500' : ''}`}
        >
          {order.orderStatus.name}
        </div>
      </div>
      <div className='flex items-center gap-5 font-semibold text-blue'>
        <h3 className='rounded-xl bg-primary px-1.5 py-1 text-xs text-white'>
          {order.orderType.name}
        </h3>
        <p>
          ул. {order.street}, д. {order.house}
          {order.appartament && `, кв. ${order.appartament}`}
        </p>
      </div>
      <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2'>
        {order.products.map((prod) => (
          <OrderProductItem key={prod.id} item={prod} />
        ))}
      </div>
      <div className='flex items-center gap-5 font-semibold text-blue'>
        <h3 className='text-sm'>Итого</h3>
        <p>{formatPrice(order.price)}</p>
      </div>
    </div>
  );
};
