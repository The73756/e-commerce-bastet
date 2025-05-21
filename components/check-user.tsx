'use client';

import { ReactNode, useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { getCookie } from '@/lib/cookie';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { AUTH_REQUIRED_PATHS, STAFF_ONLY_PATHS } from '@/lib/consts';
import { useLoadingStore } from '@/store/loading';

interface Props {
  children: ReactNode;
}

export const CheckUser = ({ children }: Props) => {
  const user = useUserStore((state) => state.user);
  const checkUser = useUserStore((state) => state.checkAuth);
  const setPageLoading = useLoadingStore((state) => state.setLoading);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      setPageLoading(true);
      const token = await getCookie('token');
      const isAuthRequired = AUTH_REQUIRED_PATHS.some((path) =>
        pathname.startsWith(path),
      );
      const isStaffRequired = STAFF_ONLY_PATHS.some((path) =>
        pathname.startsWith(path),
      );

      if ((isAuthRequired || isStaffRequired) && !token) {
        router.push(`/`);
        toast('Авторизуйтесь для доступа к этой странице');
        return;
      }

      if (token && !user) {
        const { success } = await checkUser();

        if (!success) {
          router.push('/');
          toast('Авторизуйтесь для доступа к этой странице');
          return;
        }
      }

      if (isStaffRequired && !user) {
        const { success, data } = await checkUser();
        if (success && data?.user.role !== 'ADMIN') {
          router.push('/');
          toast('У Вас нет прав администратора');
        }
        return;
      }

      setPageLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  return <>{children}</>;
};
