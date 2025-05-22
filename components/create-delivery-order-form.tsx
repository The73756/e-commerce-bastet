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
  appartament: z.string({
    required_error: 'Поле обязательно для заполнения',
    invalid_type_error: 'Поле обязательно для заполнения',
  }),
  intercom: z.boolean(),
  phone: z
    .string()
    .transform((val) => val.replace(/[\s\-()]/g, ''))
    .refine((val) => /^(\+7|8)\d{10}$/.test(val), {
      message: 'Введите корректный номер (+7 XXX XXX-XX-XX)',
    }),
  comment: z.string(),
  date: z.coerce.date(),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('create-delivery-order-form [onSubmit]', values);
    // values.phone = values.phone.replace(/(?!^\+)\D/g, '');
    // const { success, data, error } = await registration(values);
    //
    // if (success && data) {
    //   setOpen(false);
    //   form.reset();
    //   toast(`Вы зарегистрировались как ${data.user.surname} ${data.user.name}`);
    // }
    // if (error) toast(error.message);
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
                  <div className='relative h-full'>
                    <Checkbox
                      className='absolute inset-0 h-full w-full rounded-2xl border border-grey bg-white'
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
                  <Input placeholder='Дата' {...field} />
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
                  <Input placeholder='Время' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='mt-2.5 flex items-center justify-between'>
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
