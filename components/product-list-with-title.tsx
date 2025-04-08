import { ProductCard } from '@/components/product-card';

interface Props {
  title: string;
}

export const ProductListWithTitle = ({ title }: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-text text-3xl font-bold'>{title}</h2>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
        {[1, 2, 3, 4, 5].map((prod) => (
          <ProductCard key={prod} />
        ))}
      </div>
    </div>
  );
};
