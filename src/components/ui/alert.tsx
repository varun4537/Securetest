import * as React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
}

export function Alert({ className, variant = 'default', ...props }: AlertProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4',
        {
          'bg-white text-gray-900 border-gray-200': variant === 'default',
          'bg-red-50 text-red-900 border-red-200': variant === 'destructive',
          'bg-green-50 text-green-900 border-green-200': variant === 'success',
          'bg-yellow-50 text-yellow-900 border-yellow-200': variant === 'warning',
        },
        className
      )}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn('font-medium leading-none tracking-tight', className)} {...props} />;
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <div className={cn('mt-1 text-sm [&_p]:leading-relaxed', className)} {...props} />;
}
