import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-2xl py-1 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-blue text-white hover:bg-blue/90',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90',
        outline: 'border border-grey bg-white hover:text-grey-dark',
        secondary: 'bg-primary text-background hover:bg-primary/90',
        ghost: 'hover:text-blue/80 text-blue',
        link: 'text-background font-bold hover:underline',
      },
      size: {
        default: 'px-4 text-base',
        sm: 'h-8 px-3 text-xs',
        lg: 'rounded-2xl px-4 py-1 text-base justify-center',
        icon: 'p-1.5 justify-center text-xl rounded-full',
        'icon-lg': 'p-2.5 justify-center text-3xl rounded-full',
        link: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
