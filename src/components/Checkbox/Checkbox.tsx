"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../lib/utils";
import { Check } from "../Icons/Check";
import { Text } from "../Text";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  readOnly?: boolean;
}

/**
 * Checkbox
 * 왼쪽의 네모 박스 안에 체크 표시가 들어가는 전형적인 체크박스 컴포넌트
 *
 * @param label 선택적 텍스트 라벨
 * @param readOnly 읽기 전용 여부 (클릭 불가, 시각적 변경 없음)
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, readOnly, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <div className={cn("flex items-center gap-2.5", readOnly && "pointer-events-none")}>
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-1.5 border border-gray-300 bg-white transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-900 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-main-900 data-[state=checked]:border-main-900 data-[state=checked]:text-white",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="h-3 w-3" strokeWidth={13} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            "text-gray-900 select-none cursor-pointer",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          )}
        >
          <Text size="body2" weight="medium">
            {label}
          </Text>
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
