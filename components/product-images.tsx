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

export const ProductImages = () => {
  const [active, setActive] = useState(0);
  const images = [
    'https://www.belaya-tehnika.ru/images/watermarked/1/detailed/10/%D0%A5%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA_%D0%9C%D0%98%D0%A0-POZIS_RK_139.jpg',
    'https://www.coxo.ru/upload/resize_cache/pictures2/a65/roulngrfd4c22uymdcqeg75idnkkhlwa/1200_1200_1/main_676032.jpg',
    'https://www.belaya-tehnika.ru/images/watermarked/1/detailed/10/%D0%A5%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA_%D0%9C%D0%98%D0%A0-POZIS_RK_139.jpg',
    'https://www.belaya-tehnika.ru/images/watermarked/1/detailed/10/%D0%A5%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA_%D0%9C%D0%98%D0%A0-POZIS_RK_139.jpg',
    'https://www.coxo.ru/upload/resize_cache/pictures2/a65/roulngrfd4c22uymdcqeg75idnkkhlwa/1200_1200_1/main_676032.jpg',
  ];

  return (
    <div className='flex flex-col gap-2.5'>
      <div className='flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-[#EDEDED]'>
        <Image src={images[active]} alt='Product' width={332} height={332} />
      </div>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className='-ml-2 p-1.5'>
          {images.map((img, index) => (
            <CarouselItem
              className='basis-1/4 cursor-pointer pl-2 transition-transform duration-300 last:pr-2 hover:scale-110 xs:basis-1/5 md:basis-1/4'
              key={index}
              onClick={() => setActive(index)}
            >
              <div
                className={`flex h-16 items-center justify-center overflow-hidden rounded-xl border border-[#EDEDED] sm:h-[79px]`}
              >
                <Image
                  src={img}
                  alt={`Product ${index + 1}`}
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
