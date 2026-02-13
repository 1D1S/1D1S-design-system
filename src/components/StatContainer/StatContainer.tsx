"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export interface StatContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  unit: React.ReactNode;
  iconClassName?: string;
}

/**
 * StatContainer
 * 아이콘, 제목, 데이터, 단위를 표시하는 정보 카드 컴포넌트
 */
export function StatContainer({
  icon,
  title,
  value,
  unit,
  className,
  iconClassName,
  ...props
}: StatContainerProps): React.ReactElement {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-gray-200 bg-white p-8",
        "shadow-[0_1px_4px_rgba(17,17,17,0.08)]",
        "min-h-[230px] w-full",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "mt-0.5 text-main-800",
            "[&_svg]:h-9 [&_svg]:w-9",
            iconClassName
          )}
        >
          {icon}
        </div>
        <Text size="heading2" weight="medium" className="leading-tight text-gray-600">
          {title}
        </Text>
      </div>

      <div className="mt-10 flex items-end gap-2">
        <Text size="display1" weight="bold" className="text-gray-900">
          {value}
        </Text>
        <Text size="heading2" weight="medium" className="pb-1 text-gray-600">
          {unit}
        </Text>
      </div>
    </div>
  );
}
