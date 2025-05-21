'use client';

import { CustomTitle } from '@/components/ui/custom-title';
import { SortSelect } from '@/components/sort-select';
import { BrandFilter } from '@/components/brand-filter';
import { TypeSchema, useCatalogStore } from '@/store/catalog';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const CatalogTitle = ({ typeId }: { typeId: string }) => {
  const getType = useCatalogStore((state) => state.getType);
  const [type, setType] = useState<TypeSchema | undefined>();

  useEffect(() => {
    setType(getType(typeId));
  }, []);

  return (
    <>
      {type ? (
        <CustomTitle title={type?.name} />
      ) : (
        <Skeleton className='h-7 w-[200px]' />
      )}
      <SortSelect />
      <BrandFilter brands={type?.brands} />
    </>
  );
};
