import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const items = [
  {
    title: 'Category 11',
  },
  {
    title: 'Category 12',
  },
  {
    title: 'Category 13',
  },
  {
    title: 'Category 14',
  },
  {
    title: 'Category 15',
  },
  {
    title: 'Category 16',
  },
  {
    title: 'Category 17',
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='px-6 pb-10 pt-[2.25rem] text-background max-md:hidden'>
        <Image width={159} height={36} alt='Логотип Bastet' src='/logo.svg' />
      </SidebarHeader>
      <SidebarContent className='mr-2 p-6 text-background md:py-0'>
        <SidebarGroup className='p-0'>
          <SidebarGroupLabel className='mb-2.5 pl-0 text-2xl font-bold text-background'>
            Каталог
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='flex flex-col gap-1.5'>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Button variant='link' size='link'>
                    {item.title}
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='px-6 pt-4 text-background max-md:hidden'>
        <div className='flex flex-col gap-y-2 max-md:hidden'>
          <Image width={159} height={36} alt='Логотип Bastet' src='/logo.svg' />
          <p className='text-sm text-background'>© Все права защищены</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
