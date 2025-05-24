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
import { useFavoriteStore } from '@/store/favorite';
import { useBasketStore } from '@/store/basket';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .email({
      message: 'Неверный формат e-mail',
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

export function LoginForm({
  setOpenRegModal,
  setOpenLoginModal,
}: {
  setOpenLoginModal: (open: boolean) => void;
  setOpenRegModal: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const login = useUserStore((state) => state.login);
  const getFavoriteItems = useFavoriteStore((state) => state.getFavoriteItems);
  const getBasketItems = useBasketStore((state) => state.getBasketItems);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { success, data, error } = await login(values);

    if (success && data) {
      setOpenLoginModal(false);
      form.reset();
      toast(`Вы авторизовались как ${data.user.surname} ${data.user.name}`);

      await getFavoriteItems(data.user.id);
      await getBasketItems(data.user.id);
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
            Войти
          </Button>
          <Button
            className='font-semibold text-blue max-md:text-xs'
            type='button'
            variant='link'
            onClick={() => {
              setOpenLoginModal(false);
              setOpenRegModal(true);
            }}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </Form>
  );
}
