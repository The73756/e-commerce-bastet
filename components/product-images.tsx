'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useState } from 'react';
import { ProductPhoto } from '@/types/product';
import { API_URL } from '@/lib/consts';

export const ProductImages = ({ images }: { images: ProductPhoto[] }) => {
  const [active, setActive] = useState(0);

  return (
    <div className='flex flex-col gap-2.5'>
      <div className='flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-[#EDEDED] max-lg:max-h-[400px]'>
        <Image
          src={`${API_URL?.replace('api/', '')}/${images[active].url}`}
          alt='Product'
          width={332}
          height={332}
          className='h-full object-contain'
        />
      </div>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className='-ml-2 p-1.5'>
          {images.map((img, index) => (
            <CarouselItem
              className='basis-1/4 cursor-pointer pl-2 transition-transform duration-300 last:pr-2 hover:scale-110 xs:basis-1/5 md:basis-1/4'
              key={img.id}
              onClick={() => setActive(index)}
            >
              <div
                className={`flex h-16 items-center justify-center overflow-hidden rounded-xl border border-[#EDEDED] sm:h-[79px]`}
              >
                <Image
                  src={`${API_URL?.replace('api/', '')}/${img.url}`}
                  alt={`Product ${img.productId}`}
                  width={79}
                  height={79}
                  className='h-full object-contain'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='-left-3' />
        <CarouselNext className='-right-3' />
      </Carousel>
    </div>
  );
};
