'use client';
import Image from 'next/image';
import { formatPrice } from '@/lib/format-price';
import { API_URL } from '@/lib/consts';
import { OrderProduct } from '@/types/order';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomModal } from '@/components/ui/custom-modal';
import { useState } from 'react';
import { ReviewForm } from '@/components/review-form';
import { Icon } from '@/components/shared/icon';

export const OrderProductItem = ({
  item,
  canReview,
}: {
  item: OrderProduct;
  canReview: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isForm, setIsForm] = useState(canReview);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <div className='flex aspect-square min-w-14 overflow-hidden rounded-xl border border-[#EDEDED]'>
          <Image
            src={`${API_URL?.replace('api/', '')}/${item.product?.photos[0].url}`}
            alt={item.product?.name}
            width={60}
            height={60}
            className='object-contain'
          />
        </div>
        <div className='text-sm text-blue'>
          <Link href={`/product/${item.product?.id}`}>
            <h5 className='line-clamp-1 font-medium'>{item.product?.name}</h5>
          </Link>
          <p className='max-md:text-[10px]'>{item.count} шт</p>
          <p className='font-semibold'>
            {formatPrice(item.product?.price * item.count)}
          </p>
        </div>
      </div>
      {isForm && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          trigger={
            <Button size='sm' className='max-w-max'>
              <Icon className='text-lg text-yellow-300' name='shared/rating' />
              <span>Оценить</span>
            </Button>
          }
          title={`Отзыв на товар ${item.product?.name}`}
          content={
            <ReviewForm
              setOpen={setOpen}
              setIsForm={setIsForm}
              product={item.product}
            />
          }
        />
      )}
    </div>
  );
};
