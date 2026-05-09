"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardVariants = cva(
  "relative overflow-hidden bg-white border border-gray-200 transition-[transform,box-shadow] duration-200 ease-out",
  {
    variants: {
      radius: {
        sm: "rounded-2",
        md: "rounded-3",
        lg: "rounded-[14px]",
        xl: "rounded-4",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-1 hover:shadow-default",
        false: "",
      },
    },
    defaultVariants: { radius: "lg", interactive: false },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card
 * 흰 배경 + 얇은 보더 + 라운드 컨테이너. 챌린지/일지/스탯 카드의 베이스.
 *
 * @param radius `sm`(8) · `md`(12) · `lg`(14, default) · `xl`(16)
 * @param interactive hover lift + shadow
 */
export function Card({
  radius,
  interactive,
  className,
  ...props
}: CardProps): React.ReactElement {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ radius, interactive }), className)}
      {...props}
    />
  );
}

/**
 * Card.Thumb
 * 카드 상단 이미지/플레이스홀더 영역. height/aspect 직접 지정.
 */
export function CardThumb({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      data-slot="card-thumb"
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card.Body
 * 카드 하단 텍스트 영역.
 */
export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      data-slot="card-body"
      className={cn("flex flex-col gap-2 p-3.5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card.Title
 * 카드 본문 큰 라벨.
 */
export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-sm font-extrabold leading-snug tracking-[-0.2px] text-gray-900 line-clamp-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card.Meta
 * 카드 하단 메타 라인 (좌/우 분할).
 */
export function CardMeta({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      data-slot="card-meta"
      className={cn(
        "flex items-center justify-between text-[11px] text-gray-500",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card.Overlay
 * 썸네일 위에 절대 위치로 얹는 라벨 (퍼센트/이모지 등).
 */
export function CardOverlay({
  className,
  children,
  position = "top-left",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}): React.ReactElement {
  const posClass = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  }[position];
  return (
    <div
      data-slot="card-overlay"
      className={cn("absolute z-[1]", posClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Thumb = CardThumb;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Meta = CardMeta;
Card.Overlay = CardOverlay;
