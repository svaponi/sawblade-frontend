import React, { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren {
  text?: string;
  className?: string;
}

export default function DividerWithText({ text, className, children }: Props) {
  return (
    <div className={cn('relative flex items-center ', className)}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 flex-shrink text-gray-400">{text ?? children}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
