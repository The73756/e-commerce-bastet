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
import { useUserStore } from '@/store/user';
import { Product } from '@/types/product';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@/components/shared/icon';
import { useReviewStore } from '@/store/review';

const formSchema = z.object({
  rate: z.number({
    required_error: 'Поле обязательно для заполнения',
    invalid_type_error: 'Поле обязательно для заполнения',
  }),
  comment: z.string({
    required_error: 'Поле обязательно для заполнения',
    invalid_type_error: 'Поле обязательно для заполнения',
  }),
});

export function ReviewForm({
  setOpen,
  setIsForm,
  product,
}: {
  setOpen: (open: boolean) => void;
  setIsForm: (open: boolean) => void;
  product: Product;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: 0,
      comment: '',
    },
  });
  const user = useUserStore((state) => state.user);
  const createReview = useReviewStore((state) => state.createReview);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    const { success, data, error } = await createReview({
      userId: user.id,
      productId: product.id,
      ...values,
    });

    if (success && data) {
      setOpen(false);
      setIsForm(false);
      form.reset();
      toast(`Товар успешно оценен`);
    }
    if (error) toast(error.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div className='flex items-center gap-3'>
          <p className='text-sm font-medium text-grey'>Оценка:</p>
          <FormField
            control={form.control}
            name='rate'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex gap-1'>
                    {[...Array(5)].map((_, index) => (
                      <button
                        type='button'
                        key={index}
                        onClick={() => field.onChange(index + 1)}
                      >
                        <Icon
                          name='shared/rating'
                          className={`${index < field.value ? 'text-yellow-300' : 'text-text'} text-2xl transition-colors duration-300`}
                        />
                      </button>
                    ))}
                  </div>
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
                <Textarea placeholder='Отзыв' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-2.5 flex items-center justify-between'>
          <Button
            className='h-10 w-full justify-center font-semibold sm:w-1/2'
            type='submit'
          >
            Отправить
          </Button>
        </div>
      </form>
    </Form>
  );
}
