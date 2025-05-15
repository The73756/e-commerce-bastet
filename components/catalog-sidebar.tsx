'use client';

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
import { CatalogTypesResponse } from '@/api/catalog';
import { pluralize } from '@/lib/utils';
import { useCatalogStore } from '@/store/catalog';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function CatalogSidebar({
  catalogTypesResponse,
}: {
  catalogTypesResponse?: CatalogTypesResponse | null;
}) {
  const router = useRouter();
  const count = catalogTypesResponse?.count;
  const types = catalogTypesResponse?.rows;

  const selectedBrand = useCatalogStore((state) => state.selectedBrand);

  const setCatalog = useCatalogStore((state) => state.setCatalogTypes);
  const setSelectedBrand = useCatalogStore((state) => state.setSelectedBrand);

  const handleChangeType = (id?: number) => {
    setSelectedBrand(null);
    router.push(`/catalog/${id}`);
  };

  useEffect(() => setCatalog(catalogTypesResponse), []);

  return (
    <Sidebar variant='inset' collapsible='offcanvas'>
      <SidebarContent className='h-full text-background'>
        <SidebarGroup className='p-4'>
          <CustomTitle
            className='mb-5'
            title={<Link href='/catalog'>Каталог</Link>}
            desc={`${count} ${pluralize(count || 0, ['категория', 'категорий', 'категорий'])}`}
          />
          <SidebarGroupContent>
            <SidebarMenu>
              <Accordion
                type='single'
                collapsible
                className='flex flex-col gap-2.5 font-medium text-blue'
              >
                {types &&
                  types.map((item) => (
                    <AccordionItem key={item.id} value={item.name}>
                      <AccordionTrigger
                        onClick={() => handleChangeType(item?.id)}
                        className='p-0 text-base'
                      >
                        <div>{item.name}</div>
                      </AccordionTrigger>
                      <AccordionContent className='p-0'>
                        <ul className='flex flex-col gap-1 pl-5 pt-1'>
                          {item.brands.map((brand) => (
                            <li key={brand.id}>
                              <Link
                                onClick={() => setSelectedBrand(brand)}
                                className={`text-sm ${selectedBrand?.id === brand.id && 'font-bold underline'}`}
                                href={`/catalog/${item.id}`}
                              >
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
