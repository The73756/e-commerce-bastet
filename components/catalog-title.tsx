'use client';

import { CustomTitle } from '@/components/ui/custom-title';
import { SortSelect } from '@/components/sort-select';
import { BrandFilter } from '@/components/brand-filter';
import { useCatalogStore } from '@/store/catalog';

export const CatalogTitle = ({ typeId }: { typeId: string }) => {
  const getType = useCatalogStore((state) => state.getType);
  const type = getType(typeId);

  return (
    <>
      <CustomTitle title={type?.name} />
      <SortSelect />
      <BrandFilter brands={type?.brands} />
    </>
  );
};
