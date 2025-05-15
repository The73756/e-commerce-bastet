'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { BrandSchema, useCatalogStore } from '@/store/catalog';

export const BrandFilter = ({ brands }: { brands?: BrandSchema[] }) => {
  const selectedBrand = useCatalogStore((state) => state.selectedBrand);
  const setSelectedBrand = useCatalogStore((state) => state.setSelectedBrand);

  const handleUpdateBrand = async (newValue: string) => {
    const brand = brands?.find((brand) => brand.name === newValue);
    setSelectedBrand(brand);
  };

  return (
    <>
      {brands && (
        <ToggleGroup
          type={'single'}
          onValueChange={handleUpdateBrand}
          value={selectedBrand?.name}
        >
          {brands?.map((brand) => (
            <ToggleGroupItem key={brand.id} value={brand.name}>
              {brand.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </>
  );
};
