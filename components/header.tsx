import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <header className='bg-primary py-6'>
      <div className='container flex flex-wrap justify-between gap-x-24 gap-y-6 max-md:flex-col md:items-center'>
        <div className='flex flex-auto gap-x-5 gap-y-8 max-md:flex-col md:items-center'>
          <Image width={159} height={36} alt='Логотип Bastet' src='/logo.svg' />
          <label className='relative min-h-[45px] min-w-[300px] flex-1 md:min-h-16 min-[835px]:min-w-[640px]'>
            <Input
              type='text'
              placeholder='Поиск...'
              className='text-text-dark absolute inset-0 h-full pl-14'
            />
            <Icon
              name='shared/search'
              className='text-text absolute left-5 top-1/2 -translate-y-1/2 text-2xl'
            />
          </label>
        </div>
        <nav className='flex-1'>
          <ul className='flex items-center justify-between gap-6'>
            <div className='flex items-center gap-4'>
              <li>
                <Button size='icon' asChild>
                  <Link href=''>
                    <Icon name='shared/cart' />
                  </Link>
                </Button>
              </li>
              <li>
                <Button size='icon' asChild>
                  <Link href=''>
                    <Icon name='shared/favourite' />
                  </Link>
                </Button>
              </li>
            </div>
            <li>
              <Button size='lg' className='rounded-2xl py-2.5' asChild>
                <Link href=''>Войти</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
