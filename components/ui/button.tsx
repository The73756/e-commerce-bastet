import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-2xl py-1 font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-background text-primary hover:bg-secondary/80',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-primary bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-primary text-background hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-primary/80 text-primary',
        link: 'text-background font-bold hover:underline',
      },
      size: {
        default: 'px-4 text-base md:text-lg',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'text-2xl rounded-3xl px-8 text-base md:text-lg',
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
