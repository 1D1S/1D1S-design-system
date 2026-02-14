"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";
import { Icon, type IconName } from "../Icons/Icon";

export interface StatContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  iconName?: IconName;
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
  iconName,
  title,
  value,
  unit,
  className,
  iconClassName,
  ...props
}: StatContainerProps): React.ReactElement {
  const resolvedIcon =
    icon ?? (iconName ? <Icon name={iconName} size={32} /> : null);

  return (
    <div
      className={cn(
        "rounded-[24px] border border-gray-200 bg-white p-7",
        "shadow-[0_1px_4px_rgba(17,17,17,0.08)]",
        "w-full",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={cn(
            "text-main-800",
            "[&_svg]:h-8 [&_svg]:w-8",
            iconClassName
          )}
        >
          {resolvedIcon}
        </div>
        <Text size="heading2" weight="medium" className="leading-tight text-gray-600">
          {title}
        </Text>
      </div>

      <div className="mt-6 flex items-end gap-1.5">
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
