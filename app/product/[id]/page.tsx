import { ProductImages } from '@/components/product-images';
import { MainProductInfo } from '@/components/main-product-info';
import { ProductCharacteristic } from '@/components/product-characteristic';
import { ProductReviewList } from '@/components/product-review-list';

export default function Page() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-wrap gap-5 max-md:flex-col'>
        <ProductImages />
        <div className='flex flex-col gap-10 md:gap-8'>
          <MainProductInfo />
          <ProductCharacteristic />
        </div>
      </div>
      <ProductReviewList />
    </div>
  );
}
