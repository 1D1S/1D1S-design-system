'use client';

import React from 'react';
import Image from 'next/image';
import { Text } from '../Text';
import { cn } from '../../lib/utils';

interface InfoButtonProps {
  /** 상단 작은 글씨 */
  mainText: string;
  /** 상단 큰 글씨 */
  subText: string;
  /** 왼쪽 하단에 표시할 이미지 URL 또는 import */
  imageSrc: string;
  /** 이미지 대체 텍스트 */
  imageAlt?: string;
  /** 그라데이션 시작 색상 (CSS color) */
  gradientFrom: string;
  /** 그라데이션 끝 색상 (CSS color) */
  gradientTo: string;
  /** 추가 Tailwind 클래스 */
  className?: string;

  onClick?(): void;
}

export function InfoButton({
  mainText,
  subText,
  imageSrc,
  imageAlt = 'icon',
  gradientFrom,
  gradientTo,
  onClick,
  className,
}: InfoButtonProps): React.ReactElement {
  return (
    <div
      className={cn(
        'rounded-2 relative overflow-hidden p-4 sm:p-6 text-white',
        'flex flex-col justify-between',
        'h-36 w-full sm:h-47.5 sm:w-56',
        'hover:shadow-default',
        'hover:-translate-y-1',
        'transition-all duration-300',
        'cursor-pointer',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
      }}
      onClick={onClick}
    >
      <div className="flex w-full flex-col gap-0.5 sm:gap-1">
        <Text size="caption3" weight="medium" className="opacity-80 sm:text-sm">
          {mainText}
        </Text>
        <Text size="body1" weight="bold" className="mt-0.5 sm:mt-1 sm:text-2xl">
          {subText}
        </Text>
      </div>

      {/* 하단 아이콘 (좌) */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <Image src={imageSrc} alt={imageAlt} width={36} height={60} className="object-contain sm:w-12 sm:h-[78px]" />
      </div>
      {/* 하단 화살표 (우) */}
      <Text size="heading1" weight="bold" className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 sm:text-4xl">
        →
      </Text>
    </div>
  );
}
