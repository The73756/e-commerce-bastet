import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SortSelect = () => {
  return (
    <Select>
      <SelectTrigger className='mb-5 w-[250px]'>
        <SelectValue placeholder='Сортировка' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='1'>По алфавиту А-Я</SelectItem>
        <SelectItem value='2'>По алфавиту Я-А</SelectItem>
        <SelectItem value='3'>По убыванию цены</SelectItem>
        <SelectItem value='4'>По возрастанию цены</SelectItem>
      </SelectContent>
    </Select>
  );
};
