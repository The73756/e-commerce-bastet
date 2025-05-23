'use client';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { useOrderStore } from '@/store/order';
import { OrderType } from '@/types/order';
import { formatPrice } from '@/lib/format-price';
import { CreateDeliveryOrderForm } from '@/components/create-delivery-order-form';
import { CreateOrderForm } from '@/components/create-order-form';

export function CreateOrder({ setOpen }: { setOpen: (open: boolean) => void }) {
  const orderTypes = useOrderStore((state) => state.orderTypes);

  const [orderType, setOrderType] = useState<OrderType | undefined>(
    orderTypes?.find((ot) => ot.id === 1),
  );

  const handleUpdateOrderType = async (newValue: string) => {
    const checkedValue = orderTypes?.find(
      (orderType) => orderType.name === newValue,
    );
    if (checkedValue) setOrderType(checkedValue);
  };

  return (
    <div className='flex flex-col gap-2.5'>
      <ToggleGroup
        type={'single'}
        onValueChange={handleUpdateOrderType}
        value={orderType?.name}
      >
        {orderTypes?.map((ot) => (
          <ToggleGroupItem key={ot.id} value={ot.name}>
            <div className='flex items-center gap-4'>
              <span>{ot.name}</span>
              {ot.price !== 0 && <span>{formatPrice(ot.price)}</span>}
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {orderType?.id === 1 ? (
        <CreateDeliveryOrderForm
          setOpen={setOpen}
          selectedOrderType={orderType}
        />
      ) : (
        orderType && (
          <CreateOrderForm setOpen={setOpen} selectedOrderType={orderType} />
        )
      )}
    </div>
  );
}
