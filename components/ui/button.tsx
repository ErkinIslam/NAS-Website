import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default:
          'bg-brand-red text-white shadow hover:bg-brand-red-hover focus-visible:ring-brand-red',
        navy:
          'bg-brand-navy text-white shadow hover:bg-navy-800 focus-visible:ring-brand-navy',
        outline:
          'border-2 border-brand-navy text-brand-navy bg-transparent hover:bg-brand-navy hover:text-white focus-visible:ring-brand-navy',
        'outline-white':
          'border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-navy',
        ghost:
          'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        link:
          'text-brand-red underline-offset-4 hover:underline p-0 h-auto shadow-none',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-200',
      },
      size: {
        sm:  'h-8 px-4 py-2 text-xs',
        md:  'h-10 px-5 py-2.5',
        lg:  'h-12 px-7 py-3 text-base',
        xl:  'h-14 px-9 py-4 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
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
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
