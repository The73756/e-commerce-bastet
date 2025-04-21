import { ReactNode } from 'react';

export const CustomTitle = ({
  title,
  desc,
  className,
}: {
  title: string | ReactNode;
  desc?: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col gap-1 font-semibold ${className ? className : ''}`}
    >
      <h2 className='text-blue text-xl'>{title}</h2>
      {desc && <p className='text-grey text-sm'>{desc}</p>}
    </div>
  );
};
