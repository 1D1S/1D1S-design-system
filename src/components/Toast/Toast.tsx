"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon, type IconName } from "../Icons/Icon";
import { Text } from "../Text";

const toastIconStyles = {
  brand: { bg: "bg-main-200", color: "text-brand" },
  success: { bg: "bg-mint-200", color: "text-mint-900" },
  danger: { bg: "bg-red-300", color: "text-red-700" },
  info: { bg: "bg-blue-200", color: "text-blue-600" },
};

export type ToastTone = keyof typeof toastIconStyles;

const toastVariants = cva(
  cn(
    "flex items-center gap-3 px-3.5 py-3 bg-white",
    "rounded-3 border border-gray-200 shadow-lg",
    "min-w-[280px] max-w-[360px]",
  ),
);

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof toastVariants> {
  /** 톤 — `brand` (default) · `success` · `danger` · `info` */
  tone?: ToastTone;
  /** 좌측 원형 배지 아이콘 */
  icon?: IconName;
  /** 제목 (1행) */
  title?: React.ReactNode;
  /** 본문 (보조 1행) */
  body?: React.ReactNode;
  /** 우측 액션 라벨 */
  action?: React.ReactNode;
  /** 액션 클릭 콜백 */
  onAction?: () => void;
}

/**
 * Toast
 * 화이트 카드 위에 컬러 아이콘 배지 + 제목/본문/액션을 보여주는 알림.
 *
 * 단독 표시용 프레젠테이션 컴포넌트로, `ToastProvider` + `useToast`와 함께 쓸 수 있어요.
 *
 * @param tone `brand` (default) · `success` · `danger` · `info`
 *
 * @example
 * ```tsx
 * <Toast tone="success" icon="Check" title="일지를 저장했어요" body="응원이 도착하면 알려드릴게요" />
 * <Toast tone="info" icon="Bell" title="새 응원 3개" action="보기" onAction={() => view()} />
 * ```
 */
export function Toast({
  tone = "brand",
  icon,
  title,
  body,
  action,
  onAction,
  className,
  ...props
}: ToastProps): React.ReactElement {
  const t = toastIconStyles[tone];
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(toastVariants(), className)}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            t.bg,
          )}
        >
          <Icon name={icon} size={16} className={t.color} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        {title && (
          <Text size="caption2" weight="extrabold" className="block tracking-[-0.2px] text-black">
            {title}
          </Text>
        )}
        {body && (
          <Text size="caption3" weight="regular" className="mt-0.5 block text-gray-600">
            {body}
          </Text>
        )}
      </div>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 bg-transparent px-1 text-xs font-bold text-brand hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          {action}
        </button>
      )}
    </div>
  );
}
