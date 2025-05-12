import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { CustomTitle } from '@/components/ui/custom-title';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const items = [
  {
    title: 'Смартфоны',
  },
];

const brands = [
  { id: 1, name: 'Samsung' },
  { id: 2, name: 'Apple' },
  { id: 3, name: 'Asus' },
  { id: 4, name: 'Xiaomi' },
];

export function CatalogSidebar() {
  return (
    <Sidebar variant='inset' collapsible='offcanvas'>
      <SidebarContent className='h-full text-background'>
        <SidebarGroup className='p-4'>
          <CustomTitle
            className='mb-5'
            title={<Link href='/catalog'>Каталог</Link>}
            desc={`${items.length} категорий`}
          />
          <SidebarGroupContent>
            <SidebarMenu>
              <Accordion
                type='single'
                collapsible
                className='flex flex-col gap-2.5 font-medium text-blue'
              >
                {items.map((item) => (
                  <AccordionItem key={item.title} value={item.title}>
                    <AccordionTrigger className='p-0 text-base'>
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className='p-0'>
                      <ul className='flex flex-col gap-1 pl-5 pt-1'>
                        {brands.map((brand) => (
                          <li key={brand.id}>
                            <Link className='text-sm' href='/catalog'>
                              {brand.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
