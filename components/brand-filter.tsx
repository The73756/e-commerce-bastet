import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const brands = [
  { id: 1, name: 'Samsung' },
  { id: 2, name: 'Apple' },
  { id: 3, name: 'Asus' },
  { id: 4, name: 'Xiaomi' },
];

export const BrandFilter = () => {
  return (
    <ToggleGroup type='multiple'>
      {brands.map((brand) => (
        <ToggleGroupItem key={brand.id} value={brand.name}>
          {brand.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
