import { ProductInfo } from '@/types/product';

export const ProductCharacteristic = ({ info }: { info: ProductInfo[] }) => {
  return (
    <div className='grid gap-2.5 xs:grid-cols-2'>
      {info.map((char) => (
        <div className='flex flex-col gap-1 text-sm' key={char.title}>
          <h4 className='text-blue'>{char.title}</h4>
          <p className='text-text-dark'>{char.description}</p>
        </div>
      ))}
    </div>
  );
};
