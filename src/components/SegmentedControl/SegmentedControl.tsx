"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

// 회색 트랙 위를 흰 인디케이터가 미끄러지던 형태에서, **낱개 알약**이
// 나란히 서는 형태로 바뀌었다(2026-08 리디자인). 트랙이 사라졌으므로
// 배경·패딩도 없고, 칸 사이는 gap 으로만 벌린다.
const trackVariants = cva(["relative inline-flex items-center gap-1.5 select-none"], {
  variants: {
    size: {
      sm: "h-8",
      md: "h-9",
      lg: "h-11",
    },
    fullWidth: {
      true: "flex w-full",
      false: "inline-flex w-auto",
    },
  },
  defaultVariants: { size: "md", fullWidth: true },
});

const segmentVariants = cva(
  [
    "relative inline-flex h-full items-center justify-center gap-1.5 rounded-full",
    // 배경·글자만 페이드시킨다. 잔상으로 읽히던 것은 **그림자**였다 —
    // transition-colors 는 box-shadow 를 옮기지 않아 주황 글로가 페이드
    // 밖에서 따로 놀았고, 그게 직전 칸에 남은 테두리처럼 보였다.
    // 그림자는 전환 목록에서 빼 즉시 붙고 즉시 사라지게 두고, 색만
    // 부드럽게 넘긴다.
    "whitespace-nowrap outline-none",
    "transition-[background-color,color] duration-150 ease-out",
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
        // 선택된 칸만 채운다 — 글자 색만 바꾸던 예전보다 어느 쪽이
        // 골라져 있는지가 멀리서도 읽힌다.
        true: "bg-main-800 text-white shadow-[0_4px_12px_-4px_rgba(255,87,34,0.5)]",
        false: "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700",
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
 * 나란히 선 알약 중 하나만 채워지는 단일 선택 컨트롤.
 *
 * 선택 표시가 **칸을 채우는 방식**이라 글자 색만 바뀌던 예전보다 상태가
 * 멀리서도 읽힌다. 값 선택·비활성·키보드 이동·controlled/uncontrolled 는
 * 그대로다 — 바뀐 것은 겉모습뿐이다.
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
  // 키보드 좌/우 이동의 기준점. 인디케이터가 사라진 뒤로는 이 용도뿐이다.
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
