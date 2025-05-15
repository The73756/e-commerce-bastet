'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortSchema, useSortStore } from '@/store/sort';
import { useProductStore } from '@/store/product';
import { useCatalogStore } from '@/store/catalog';
import { useSearchStore } from '@/store/search';

const sortItems: SortSchema[] = [
  {
    title: 'По алфавиту А-Я',
    order: 'ASC',
    sort: 'name',
  },
  {
    title: 'По алфавиту Я-А',
    order: 'DESC',
    sort: 'name',
  },
  {
    title: 'По убыванию цены',
    order: 'DESC',
    sort: 'price',
  },
  {
    title: 'По возрастанию цены',
    order: 'ASC',
    sort: 'price',
  },
];

export const SortSelect = () => {
  const selectedSortIndex = useSortStore((state) => state.selectedSortIndex);
  const activeTypeId = useProductStore((state) => state.activeTypeId);
  const selectedBrand = useCatalogStore((state) => state.selectedBrand);
  const searchTerm = useSearchStore((state) => state.term);

  const setSort = useSortStore((state) => state.setSort);
  const getAllProducts = useProductStore((state) => state.getAllProducts);

  const handleSelect = async (value: string) => {
    const newSort = sortItems[Number(value)];
    setSort(newSort, value);

    await getAllProducts({
      sort: newSort.sort,
      order: newSort.order,
      typeId: activeTypeId,
      brandId: selectedBrand?.id,
      search: searchTerm,
    });
  };

  return (
    <Select value={selectedSortIndex ?? ''} onValueChange={handleSelect}>
      <SelectTrigger className='w-[250px] p-0'>
        <SelectValue placeholder='Сортировка' />
      </SelectTrigger>
      <SelectContent className='text-sm'>
        {sortItems.map((item, index) => (
          <SelectItem key={index} value={String(index)}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
