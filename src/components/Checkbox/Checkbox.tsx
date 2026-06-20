"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../lib/utils";
import { Check } from "../Icons/Check";
import { Text } from "../Text";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  /** 읽기 전용 — 클릭/포커스 비활성, 시각은 유지 */
  readOnly?: boolean;
}

/**
 * Checkbox v3
 * 18×18 박스, 체크 시 brand 컬러로 채움.
 * 체크되면 라벨이 자동으로 회색 + 취소선 처리됨 (체크리스트 스타일).
 *
 * @example
 * ```tsx
 * <Checkbox label="아침 30분 러닝" defaultChecked />
 * <Checkbox label="물 2L 마시기" />
 * ```
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, readOnly, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        readOnly && "pointer-events-none",
      )}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          "peer h-[18px] w-[18px] shrink-0 cursor-pointer rounded-1.5 border-[1.5px] border-gray-300 bg-white text-white",
          "transition-[background-color,border-color] duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-[0.45]",
          "data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-white",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current animate-pop">
          <Check className="h-2.5 w-2.5" strokeWidth={8} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label ? (
        <label
          htmlFor={checkboxId}
          className={cn(
            "cursor-pointer select-none text-gray-800 transition-colors",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-[0.45]",
            "peer-data-[state=checked]:text-gray-500 peer-data-[state=checked]:line-through",
          )}
        >
          <Text size="caption2" weight="medium">
            {label}
          </Text>
        </label>
      ) : null}
    </div>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
