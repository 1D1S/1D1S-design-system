"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon } from "../Icons/Icon";

const itemVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-lg",
    "select-none transition-colors duration-150 ease-out outline-none",
    "focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
      },
      active: {
        true: "bg-brand text-white font-semibold",
        false: "text-gray-600 hover:bg-gray-100",
      },
    },
    defaultVariants: { size: "md", active: false },
  },
);

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange">,
    VariantProps<typeof itemVariants> {
  /** 전체 페이지 수 */
  count: number;
  /** 현재 페이지 (1-indexed, controlled) */
  page?: number;
  /** 초기 페이지 (1-indexed, uncontrolled) */
  defaultPage?: number;
  onPageChange?(page: number): void;
  /** 현재 페이지 양옆에 노출할 형제 페이지 수 (기본 1) */
  siblingCount?: number;
}

const DOTS = "dots" as const;

// 현재 페이지 기준으로 노출할 항목 배열을 만든다. 끝에서 잘릴 땐 "…" 삽입.
function buildRange(
  count: number,
  page: number,
  siblingCount: number,
): Array<number | typeof DOTS> {
  // 1 + 1(좌점) + 1(우점) + 2(양끝) + 2*siblings 보다 적으면 전부 표시
  const totalSlots = siblingCount * 2 + 5;
  if (count <= totalSlots) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, count);
  const showLeftDots = left > 2;
  const showRightDots = right < count - 1;

  const range: Array<number | typeof DOTS> = [1];
  if (showLeftDots) range.push(DOTS);
  for (let p = showLeftDots ? left : 2; p <= (showRightDots ? right : count - 1); p += 1) {
    range.push(p);
  }
  if (showRightDots) range.push(DOTS);
  range.push(count);
  return range;
}

/**
 * Pagination
 * 페이지 번호 + 이전/다음 화살표. 페이지 수가 많으면 "…"로 축약한다.
 *
 * @example
 * ```tsx
 * <Pagination count={20} defaultPage={1} onPageChange={(p) => fetchPage(p)} />
 * ```
 */
export function Pagination({
  count,
  page,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  size = "md",
  className,
  ...props
}: PaginationProps): React.ReactElement {
  const isControlled = page !== undefined;
  const [internalPage, setInternalPage] = React.useState(defaultPage);
  const current = Math.min(Math.max(isControlled ? page : internalPage, 1), count);

  const goTo = (next: number): void => {
    const clamped = Math.min(Math.max(next, 1), count);
    if (clamped === current) return;
    if (!isControlled) setInternalPage(clamped);
    onPageChange?.(clamped);
  };

  const items = buildRange(count, current, siblingCount);

  return (
    <nav
      aria-label="페이지네이션"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={current <= 1}
        onClick={() => goTo(current - 1)}
        className={cn(itemVariants({ size }))}
      >
        <Icon name="ChevronLeft" className="size-5" />
      </button>

      {items.map((item, index) =>
        item === DOTS ? (
          <span
            key={`dots-${index}`}
            aria-hidden
            className={cn(itemVariants({ size }), "pointer-events-none")}
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`${item} 페이지`}
            aria-current={item === current ? "page" : undefined}
            onClick={() => goTo(item)}
            className={cn(itemVariants({ size, active: item === current }))}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="다음 페이지"
        disabled={current >= count}
        onClick={() => goTo(current + 1)}
        className={cn(itemVariants({ size }))}
      >
        <Icon name="ChevronRight" className="size-5" />
      </button>
    </nav>
  );
}
