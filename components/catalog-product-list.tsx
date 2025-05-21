'use client';

import { useProductStore } from '@/store/product';
import { ProductCard } from '@/components/product-card';
import { ProductCardLoader } from '@/components/ui/product-card-loader';

export const CatalogProductList = () => {
  const products = useProductStore((state) => state.products);
  const productsLoading = useProductStore((state) => state.isLoading);

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
      {productsLoading
        ? [1, 2, 3, 4].map((item) => <ProductCardLoader key={item} />)
        : products.map((prod) => <ProductCard key={prod.id} product={prod} />)}
    </div>
  );
};
