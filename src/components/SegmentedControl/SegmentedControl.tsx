"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

const trackVariants = cva(
  [
    "relative inline-flex items-center rounded-full bg-gray-100 p-1",
    "isolate select-none",
  ],
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-[46px]",
      },
      fullWidth: {
        true: "flex w-full",
        false: "inline-flex w-auto",
      },
    },
    defaultVariants: { size: "md", fullWidth: true },
  },
);

const segmentVariants = cva(
  [
    "relative z-10 inline-flex h-full items-center justify-center gap-1.5 rounded-full",
    "whitespace-nowrap transition-colors duration-200 ease-out outline-none",
    "focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "px-3.5 text-xs",
        md: "px-5 text-sm",
        lg: "px-6 text-base",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
      selected: {
        true: "text-brand",
        false: "text-gray-500 hover:text-gray-700",
      },
    },
    defaultVariants: { size: "md", fullWidth: true, selected: false },
  },
);

// 컨트롤 사이즈별 글자 크기 — TextField/Dropdown 패밀리와 동일 (sm 12 · md 14 · lg 16px)
const textSizeBySize = {
  sm: "caption3",
  md: "caption2",
  lg: "caption1",
} as const;

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  /** 좌측 아이콘 */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof trackVariants> {
  options: SegmentedControlOption[];
  /** 선택값 (controlled) */
  value?: string;
  /** 초기 선택값 (uncontrolled) */
  defaultValue?: string;
  onValueChange?(value: string): void;
}

/**
 * SegmentedControl
 * 회색 트랙 위에서 흰 인디케이터가 슬라이드 이동하는 단일 선택 세그먼트 컨트롤.
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   aria-label="챌린지 유형"
 *   options={[
 *     { value: "personal", label: "개인 챌린지", icon: <Person /> },
 *     { value: "group", label: "단체 챌린지", icon: <People /> },
 *   ]}
 *   defaultValue="personal"
 *   onValueChange={(v) => setType(v)}
 * />
 * ```
 */
export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  fullWidth = true,
  className,
  ...props
}: SegmentedControlProps): React.ReactElement {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue ?? options[0]?.value,
  );
  const selectedValue = isControlled ? value : internalValue;
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === selectedValue),
  );

  const select = (next: string): void => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  // 키보드 좌/우 이동 (비활성 항목 건너뜀)
  const moveBy = (delta: number): void => {
    const count = options.length;
    for (let step = 1; step <= count; step += 1) {
      const idx = (selectedIndex + delta * step + count * step) % count;
      const candidate = options[idx];
      if (candidate && !candidate.disabled) {
        select(candidate.value);
        return;
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveBy(1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveBy(-1);
    }
  };

  return (
    <div
      role="radiogroup"
      onKeyDown={handleKeyDown}
      className={cn(trackVariants({ size, fullWidth }), className)}
      {...props}
    >
      {/* 슬라이딩 인디케이터 — 선택 인덱스만큼 자기 너비의 100%씩 이동 */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1 bottom-1 left-1 z-0 rounded-full bg-white shadow-sm",
          // Card와 동일한 DS 표준 "부드러운 이동" 모션
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        )}
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${selectedIndex * 100}%)`,
        }}
      />

      {options.map((option) => {
        const selected = option.value === selectedValue;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={option.disabled}
            tabIndex={selected ? 0 : -1}
            onClick={() => select(option.value)}
            className={cn(segmentVariants({ size, fullWidth, selected }))}
          >
            {option.icon ? (
              <span className="inline-flex shrink-0 items-center justify-center text-inherit [&>svg]:size-5">
                {option.icon}
              </span>
            ) : null}
            <Text size={textSizeBySize[size ?? "md"]} weight="medium" className="text-inherit">
              {option.label}
            </Text>
          </button>
        );
      })}
    </div>
  );
}
