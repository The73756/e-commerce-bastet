'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/store/user';
import ReactInputMask from 'react-input-mask';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { useOrderStore } from '@/store/order';
import { OrderType } from '@/types/order';
import { formatPrice } from '@/lib/format-price';
import { CreateDeliveryOrderForm } from '@/components/create-delivery-order-form';

const formSchema = z.object({
  surname: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения'),
  name: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения'),
  email: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .email({
      message: 'Неверный формат e-mail',
    }),
  phone: z
    .string()
    .transform((val) => val.replace(/[\s\-()]/g, ''))
    .refine((val) => /^(\+7|8)\d{10}$/.test(val), {
      message: 'Введите корректный номер (+7 XXX XXX-XX-XX)',
    }),
  password: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .min(8, {
      message: 'Пароль должен быть не меньше 8 символов',
    })
    .min(1, {
      message: 'Поле обязательно для заполнения',
    }),
});

export function CreateOrder({ setOpen }: { setOpen: (open: boolean) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surname: '',
      name: '',
      email: '',
      phone: '+7',
      password: '',
    },
  });
  const registration = useUserStore((state) => state.registration);
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.phone = values.phone.replace(/(?!^\+)\D/g, '');
    const { success, data, error } = await registration(values);

    if (success && data) {
      setOpen(false);
      form.reset();
      toast(`Вы зарегистрировались как ${data.user.surname} ${data.user.name}`);
    }
    if (error) toast(error.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2.5'
      >
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
          <div>dfg</div>
        )}
      </form>
    </Form>
  );
}
