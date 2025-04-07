import Image from 'next/image';
import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='bg-primary mt-auto py-6'>
      <div className='container flex flex-wrap justify-between gap-x-6 gap-y-6 md:items-center'>
        <div className='flex flex-col items-center gap-2 md:hidden'>
          <Image width={159} height={36} alt='Логотип Bastet' src='/logo.svg' />
          <p className='text-sm text-background'>© Все права защищены</p>
        </div>
        <ul className='flex items-center justify-between gap-4 md:ml-auto'>
          <li>
            <Button size='icon' className='p-2.5' asChild>
              <Link href=''>
                <Icon name='shared/tg' />
              </Link>
            </Button>
          </li>
          <li>
            <Button size='icon' className='p-2.5' asChild>
              <Link href=''>
                <Icon name='shared/vk' />
              </Link>
            </Button>
          </li>
          <li>
            <Button size='icon' className='p-2.5' asChild>
              <Link href=''>
                <Icon name='shared/youtube' />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </footer>
  );
};
