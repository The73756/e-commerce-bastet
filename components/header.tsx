'use client';
import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { CustomModal } from '@/components/ui/custom-modal';
import { LoginForm } from '@/components/login-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUserStore } from '@/store/user';
import { RegForm } from '@/components/reg-form';
import { useSearchStore } from '@/store/search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

export const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegModal, setOpenRegModal] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const user = useUserStore((state) => state.user);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const search = (debouncedValue: string) => {
    setSearchTerm(debouncedValue);
    if (debouncedValue) {
      router.replace('/search?search=' + debouncedValue);
      return;
    }

    router.replace(pathname);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setLocalSearch(target.value);
  };

  const debouncedSearchTerm = useDebounce(localSearch, 500);

  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setLocalSearch(searchParams.get('search') || '');
    setSearchTerm(searchParams.get('search') || '');
  }, []);

  useEffect(() => {
    if (pathname !== '/search') {
      setLocalSearch('');
      setSearchTerm('');
    }
  }, [pathname]);

  return (
    <header className='py-5.5 sticky top-0 z-10 mx-2.5 flex justify-between gap-x-24 gap-y-6 rounded-b-2xl bg-white px-4 py-6 max-md:flex-col md:items-center'>
      <Link href='/'>
        <Image width={120} height={40} alt='Логотип Bastet' src='/logo.svg' />
      </Link>
      <div className='flex flex-auto items-center gap-2.5 max-md:flex-wrap'>
        <label className='relative min-h-[40px] min-w-[200px] flex-1 lg:min-w-[500px]'>
          <Input
            value={localSearch}
            onChange={handleInput}
            placeholder='Поиск...'
            className='absolute inset-0 h-full pl-14'
          />
          <Icon
            name='shared/search'
            className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-grey-dark'
          />
        </label>
        <nav>
          <ul className='flex items-center justify-between gap-2.5 max-xs:flex-wrap max-xs:justify-start'>
            {user && (
              <>
                <li className='md:hidden'>
                  <Button size='icon' className='h-10 w-10' asChild>
                    <Link href='/profile'>
                      <Icon name='shared/cart' />
                    </Link>
                  </Button>
                </li>
                <li className='md:hidden'>
                  <Button size='icon' className='h-10 w-10' asChild>
                    <Link href='/profile'>
                      <Icon name='shared/favourite' />
                    </Link>
                  </Button>
                </li>
              </>
            )}
            <li>
              {user ? (
                <Button
                  size='lg'
                  className='h-10 px-2 py-2.5 lg:w-[194px]'
                  asChild
                >
                  <Link href='/profile'>
                    <span className='truncate'>
                      {user.surname} {user.name}
                    </span>
                  </Link>
                </Button>
              ) : (
                <>
                  <CustomModal
                    open={openLoginModal}
                    setOpen={setOpenLoginModal}
                    trigger={
                      <Button size='lg' className='h-10 py-2.5 lg:w-[194px]'>
                        Войти
                      </Button>
                    }
                    title='Авторизация'
                    content={
                      <LoginForm
                        setOpenRegModal={setOpenRegModal}
                        setOpenLoginModal={setOpenLoginModal}
                      />
                    }
                  />
                  <CustomModal
                    open={openRegModal}
                    setOpen={setOpenRegModal}
                    trigger={
                      <Button className='hidden'>Зарегистрироваться</Button>
                    }
                    title='Регистрация'
                    content={
                      <RegForm
                        setOpenRegModal={setOpenRegModal}
                        setOpenLoginModal={setOpenLoginModal}
                      />
                    }
                  />
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
