import { ProductListWithTitle } from '@/components/product-list-with-title';

export default function Home() {
  return (
    <div className='container flex flex-col gap-5'>
      <ProductListWithTitle title='Товары дня' />
      <ProductListWithTitle title='Успейте купить' />
    </div>
  );
}
