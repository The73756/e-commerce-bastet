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
import ReactInputMask from 'react-input-mask';
import { OrderType } from '@/types/order';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice } from '@/lib/format-price';
import { useBasketStore } from '@/store/basket';
import { useOrderStore } from '@/store/order';
import { useUserStore } from '@/store/user';

const formSchema = z.object({
  street: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения'),
  house: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения'),
  appartament: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения'),
  intercom: z.boolean(),
  phone: z
    .string()
    .transform((val) => val.replace(/[\s\-()]/g, ''))
    .refine((val) => /^(\+7|8)\d{10}$/.test(val), {
      message: 'Введите корректный номер (+7 XXX XXX-XX-XX)',
    }),
  comment: z.string(),
  date: z.coerce.date({
    required_error: 'Поле обязательно для заполнения',
    invalid_type_error: 'Поле обязательно для заполнения',
  }),
  time: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
});

export function CreateDeliveryOrderForm({
  setOpen,
  selectedOrderType,
}: {
  setOpen: (open: boolean) => void;
  selectedOrderType: OrderType;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: '',
      house: '',
      appartament: '',
      intercom: false,
      phone: '',
      comment: '',
      time: '',
    },
  });
  const basketItems = useBasketStore((state) => state.items);
  const createOrder = useOrderStore((state) => state.createOrder);
  const user = useUserStore((state) => state.user);
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const setOrders = useOrderStore((state) => state.setOrders);
  const orders = useOrderStore((state) => state.orders);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;

    values.phone = values.phone.replace(/(?!^\+)\D/g, '');

    const orderData = {
      userId: user?.id,
      orderTypeId: selectedOrderType.id,
      orderStatusId: 1,
      price:
        basketItems.reduce((sum, item) => {
          return sum + item.product.price * item.count;
        }, 0) + selectedOrderType.price,
      street: values.street,
      house: values.house,
      appartament: values.appartament,
      intercom: values.intercom,
      phone: values.phone,
      comment: values.comment,
      date: values.date,
      time: values.time,
      products: basketItems,
    };

    const { success, data, error } = await createOrder(orderData);

    if (success && data) {
      await clearBasket();
      setOpen(false);
      form.reset();

      if (orders) {
        setOrders([data, ...orders]);
      } else {
        setOrders([data]);
      }
      toast(`Заказ успешно создан`);
    }
    if (error) toast(error.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2.5'
      >
        <p className='my-2 text-sm opacity-70'>
          В данный момент доставка осуществляется только по г. Кисловодск
        </p>
        <div className='grid grid-cols-3 gap-2.5'>
          <div className='col-span-3'>
            <FormField
              control={form.control}
              name='street'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Улица' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='house'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Дом' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='appartament'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Квартира' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='intercom'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative h-[45px]'>
                    <Checkbox
                      className='absolute inset-0 h-[45px] w-full rounded-2xl border border-grey bg-white'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ReactInputMask
                  mask='+7 (999) 999-99-99'
                  maskChar='_'
                  value={field.value}
                  onChange={field.onChange}
                >
                  {(inputProps: any) => (
                    <Input {...inputProps} placeholder='+7 (___) ___-__-__' />
                  )}
                </ReactInputMask>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-2.5'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Дата получения' type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Время' type='time' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder='Комментарий к заказу'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            type='submit'
          >
            Оформить заказ
          </Button>
        </div>
      </form>
    </Form>
  );
}
