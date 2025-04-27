import { ProductImages } from '@/components/product-images';
import { MainProductInfo } from '@/components/main-product-info';
import { ProductCharacteristic } from '@/components/product-characteristic';
import { ProductReviewList } from '@/components/product-review-list';

export default function Page() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex gap-5 max-lg:flex-col'>
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
