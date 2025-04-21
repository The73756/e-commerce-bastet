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

const brands = [
  { id: 1, name: 'Brand 1' },
  { id: 2, name: 'Brand 2' },
  { id: 3, name: 'Brand 3' },
  { id: 4, name: 'Brand 4' },
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
                className='text-blue flex flex-col gap-2.5 font-medium'
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
