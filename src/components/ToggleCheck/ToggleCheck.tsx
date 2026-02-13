"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "../../lib/utils";
import { Check } from "../Icons/Check";
import { Text } from "../Text";

export interface ToggleCheckProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  children: React.ReactNode;
}

/**
 * ToggleCheck
 * 체크 표시가 포함된 토글 버튼 컴포넌트. 선택 상태에 따라 체크 아이콘과 배경색이 변경됩니다.
 * 
 * @example
 * ```tsx
 * <ToggleCheck>선택지 1</ToggleCheck>
 * ```
 */
export function ToggleCheck({
  children,
  className,
  ...props
}: ToggleCheckProps): React.ReactElement {
  return (
    <TogglePrimitive.Root
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-2 px-4 py-3.5 transition-all duration-200 cursor-pointer",
        "bg-white border border-gray-300 text-gray-600 hover:bg-white",
        "data-[state=on]:border-main-900 data-[state=on]:bg-main-200 data-[state=on]:text-main-900",
        className
      )}
      {...props}
    >
      <Text
        size="body2"
        weight="medium"
        className="flex-1 text-left transition-colors group-data-[state=on]:text-main-900"
      >
        {children}
      </Text>
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
          "border-gray-300 bg-white group-data-[state=on]:border-main-900 group-data-[state=on]:bg-main-900"
        )}
      >
        <Check
          className={cn(
            "h-2.5 w-2.5 text-white transition-opacity duration-200",
            "opacity-0 group-data-[state=on]:opacity-100"
          )}
          strokeWidth={12}
        />
      </div>
    </TogglePrimitive.Root>
  );
}
