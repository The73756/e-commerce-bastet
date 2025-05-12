import { ProductImages } from '@/components/product-images';
import { MainProductInfo } from '@/components/main-product-info';
import { ProductCharacteristic } from '@/components/product-characteristic';
import { ProductReviewList } from '@/components/product-review-list';
import { getOneProduct } from '@/api/product';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const productResponse = await getOneProduct(id);

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex gap-5 max-lg:flex-col'>
        {productResponse.data?.photos && (
          <ProductImages images={productResponse.data?.photos} />
        )}
        {productResponse.data && (
          <div className='flex flex-col gap-10 md:gap-8'>
            <MainProductInfo product={productResponse.data} />
            <ProductCharacteristic info={productResponse.data?.info} />
          </div>
        )}
      </div>
      {productResponse.data && (
        <ProductReviewList
          totalRating={productResponse.data?.rating}
          ratings={productResponse.data?.ratings}
        />
      )}
    </div>
  );
}
