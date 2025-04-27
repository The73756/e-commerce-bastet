export const TagItem = ({
  tag,
  size,
  className,
}: {
  tag: { name: string };
  size: 'sm' | 'lg';
  className?: string;
}) => {
  return (
    <div
      className={`${size === 'sm' ? 'rounded-lg text-xs' : 'rounded-xl'} bg-primary px-1.5 py-1 text-white ${className}`}
    >
      {tag.name}
    </div>
  );
};
