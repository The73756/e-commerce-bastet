const characteristics = [
  {
    title: 'Product Characteristic 1',
    description: 'Product Characteristic',
  },
  {
    title: 'Product Characteristic 2',
    description: 'Product Characteristic',
  },
  {
    title: 'Product Characteristic 3',
    description: 'Product Characteristic',
  },
  {
    title: 'Product Characteristic 4',
    description: 'Product Characteristic',
  },
  {
    title: 'Product Characteristic 5',
    description: 'Product Characteristic',
  },
];

export const ProductCharacteristic = () => {
  return (
    <div className='grid gap-2.5 xs:grid-cols-2'>
      {characteristics.map((char) => (
        <div className='flex flex-col gap-1 text-sm' key={char.title}>
          <h4 className='text-blue'>{char.title}</h4>
          <p className='text-text-dark'>{char.description}</p>
        </div>
      ))}
    </div>
  );
};
