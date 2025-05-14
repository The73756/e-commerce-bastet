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

export function RegForm({
  setOpenRegModal,
  setOpenLoginModal,
}: {
  setOpenLoginModal: (open: boolean) => void;
  setOpenRegModal: (open: boolean) => void;
}) {
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.phone = values.phone.replace(/(?!^\+)\D/g, '');
    const { success, data, error } = await registration(values);

    if (success && data) {
      setOpenRegModal(false);
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
        <FormField
          control={form.control}
          name='surname'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Фамилия' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Имя' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='E-mail' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='Пароль' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-2.5 flex items-center justify-between'>
          <Button
            className='h-10 w-1/2 justify-center font-semibold'
            type='submit'
          >
            Зарегистрироваться
          </Button>
          <Button
            className='font-semibold text-blue max-md:text-xs'
            type='button'
            variant='link'
            onClick={() => {
              setOpenLoginModal(true);
              setOpenRegModal(false);
            }}
          >
            Авторизоваться
          </Button>
        </div>
      </form>
    </Form>
  );
}
