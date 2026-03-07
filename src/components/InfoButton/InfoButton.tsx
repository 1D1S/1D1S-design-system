"use client";

import React from "react";
import Image from "next/image";
import { Text } from "../Text";
import { cn } from "../../lib/utils";

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
  imageAlt = "icon",
  gradientFrom,
  gradientTo,
  onClick,
  className,
}: InfoButtonProps): React.ReactElement {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2 text-white",
        "flex flex-col justify-between",
        "p-2 sm:p-4 lg:p-6",
        "h-24 w-full sm:h-36 lg:h-47.5 lg:w-56",
        "hover:shadow-default hover:-translate-y-1 transition-all duration-300",
        onClick && "cursor-pointer",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
      }}
      onClick={onClick}
    >
      <div className="flex w-full flex-col gap-0.5 sm:gap-1">
        <Text size="caption3" weight="medium" className="opacity-80">
          {mainText}
        </Text>
        <Text size="caption2" weight="bold" className="mt-0.5 sm:text-xl sm:mt-1 lg:text-2xl">
          {subText}
        </Text>
      </div>

      {/* 하단 아이콘 (좌) */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={24}
          height={40}
          className="object-contain sm:w-9 sm:h-15 lg:w-12 lg:h-19.5"
        />
      </div>
      {/* 하단 화살표 (우) */}
      <Text
        size="body2"
        weight="bold"
        className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4 sm:text-3xl lg:right-6 lg:bottom-6 lg:text-4xl"
      >
        →
      </Text>
    </div>
  );
}
