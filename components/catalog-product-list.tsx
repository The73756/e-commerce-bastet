'use client';

import { useProductStore } from '@/store/product';
import { ProductCard } from '@/components/product-card';

export const CatalogProductList = () => {
  const products = useProductStore((state) => state.products);

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
};
