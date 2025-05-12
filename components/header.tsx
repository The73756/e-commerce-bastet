'use client';
import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { CustomModal } from '@/components/ui/custom-modal';
import { LoginForm } from '@/components/login-form';
import { useState } from 'react';

export const Header = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <header className='py-5.5 sticky top-0 z-10 mx-2.5 flex justify-between gap-x-24 gap-y-6 rounded-b-2xl bg-white px-4 py-6 max-md:flex-col md:items-center'>
      <Link href='/'>
        <Image width={120} height={40} alt='Логотип Bastet' src='/logo.svg' />
      </Link>
      <div className='flex flex-auto items-center gap-2.5 max-md:flex-wrap'>
        <label className='relative min-h-[40px] min-w-[200px] flex-1 lg:min-w-[500px]'>
          <Input
            placeholder='Поиск...'
            className='absolute inset-0 h-full pl-14'
          />
          <Icon
            name='shared/search'
            className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-grey-dark'
          />
        </label>
        <nav>
          <ul className='flex items-center justify-between gap-2.5'>
            <li className='md:hidden'>
              <Button size='icon' className='h-10 w-10' asChild>
                <Link href=''>
                  <Icon name='shared/cart' />
                </Link>
              </Button>
            </li>
            <li>
              <CustomModal
                open={openLoginModal}
                setOpen={setOpenLoginModal}
                trigger={
                  <Button size='lg' className='h-10 py-2.5 lg:w-[194px]'>
                    Войти
                  </Button>
                }
                title='Авторизация'
                content={<LoginForm setOpen={setOpenLoginModal} />}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
