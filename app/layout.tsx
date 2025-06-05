import type { Metadata } from 'next';
import './globals.css';
import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';
import { Header } from '@/components/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { CatalogSidebar } from '@/components/catalog-sidebar';
import { CustomSidebarTrigger } from '@/components/ui/custom-sidebar-trigger';
import { CartSidebar } from '@/components/cart-sidebar';
import { Toaster } from '@/components/ui/sonner';
import { getCatalogTypes } from '@/api/catalog';
import { CheckUser } from '@/components/check-user';
import { GetFavoriteAndBasket } from '@/components/get-favorite-and-basket';

export const metadata: Metadata = {
  title: 'Bastet',
  description: 'E-commerce Bastet',
};

const nunito = Nunito({
  subsets: ['cyrillic', 'latin'],
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const catalogTypesResponse = await getCatalogTypes();

  return (
    <html lang='ru'>
      <body className={`antialiased ${nunito.className} bg-blue`}>
        <CheckUser>
          <>
            <GetFavoriteAndBasket />
            <Header />
            <SidebarProvider defaultOpen>
              <CatalogSidebar
                catalogTypesResponse={catalogTypesResponse.data}
              />
              <CustomSidebarTrigger className='fixed right-6 top-7 z-10 md:hidden' />
              <SidebarInset>
                <div className='flex-1 rounded-2xl bg-white p-4 max-md:mx-2.5 max-md:mt-2.5 max-md:max-w-full md:max-w-[calc(100vw-29rem-8px)]'>
                  {children}
                </div>
                <CartSidebar />
              </SidebarInset>
            </SidebarProvider>
          </>
        </CheckUser>
        <Toaster />
      </body>
    </html>
  );
}
