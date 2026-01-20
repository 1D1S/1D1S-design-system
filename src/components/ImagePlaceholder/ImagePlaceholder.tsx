'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Logo } from '../icons/Logo';

interface ImagePlaceholderProps {
  className?: string;
  logoSize?: 'sm' | 'md' | 'lg';
}

/**
 * ImagePlaceholder
 * 이미지가 없을 때 연한 primary 색상 배경에 로고를 보여주는 컴포넌트
 */
export function ImagePlaceholder({
  className,
  logoSize = 'md',
}: ImagePlaceholderProps): React.ReactElement {
  const logoSizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'w-4 h-6',
    md: 'w-6 h-10',
    lg: 'w-8 h-14',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-main-200',
        className
      )}
    >
      <Logo className={cn('text-main-500', logoSizeClasses[logoSize])} />
    </div>
  );
}
