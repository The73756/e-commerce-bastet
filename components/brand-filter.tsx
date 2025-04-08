import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const brands = [
  { id: 1, name: 'Brand 1' },
  { id: 2, name: 'Brand 2' },
  { id: 3, name: 'Brand 3' },
  { id: 4, name: 'Brand 4' },
  { id: 5, name: 'Brand 5' },
  { id: 6, name: 'Brand 6' },
  { id: 7, name: 'Brand 7' },
];

export const BrandFilter = () => {
  return (
    <ToggleGroup type='multiple' className='mb-12'>
      {brands.map((brand) => (
        <ToggleGroupItem key={brand.id} value={brand.name}>
          {brand.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
