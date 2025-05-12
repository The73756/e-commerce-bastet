'use client';

import { ProductResponse, useProductStore } from '@/store/product';
import { ProductCard } from '@/components/product-card';

export const ProductList = ({
  productData,
}: {
  productData: ProductResponse;
}) => {
  const setProducts = useProductStore((state) => state.setProducts);
  setProducts(productData.rows);

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-2.5'>
      {productData.rows?.slice(0, 5).map((prod) => (
        <>
          <ProductCard key={prod.id} product={prod} />
        </>
      ))}
    </div>
  );
};
