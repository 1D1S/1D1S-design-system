"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "../Icons";
import { Text } from "../Text";

export interface CheckContainerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?(checked: boolean): void;
  showCheckIndicator?: boolean;
  width?: number | string;
  height?: number | string;
}

/**
 * CheckContainer
 * 선택 가능한 카드형 컨테이너. 우측 상단 체크 인디케이터 표시 여부를 제어할 수 있습니다.
 */
export function CheckContainer({
  label,
  icon,
  children,
  checked,
  defaultChecked = false,
  onCheckedChange,
  showCheckIndicator = true,
  width = 320,
  height = 220,
  className,
  disabled,
  onClick,
  style,
  "aria-label": ariaLabel,
  ...props
}: CheckContainerProps): React.ReactElement {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] =
    React.useState<boolean>(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;
  const hasCustomChildren = children !== undefined;
  const resolvedAriaLabel =
    ariaLabel ??
    (typeof label === "string" || typeof label === "number"
      ? String(label)
      : undefined);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (disabled) return;

    const nextChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
    onClick?.(event);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      aria-label={resolvedAriaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden rounded-[28px] border-2 transition-colors duration-200",
        "flex flex-col items-center justify-center",
        !hasCustomChildren && "gap-4",
        isChecked
          ? "border-main-800 bg-main-200 text-main-800"
          : "border-gray-300 bg-white text-gray-500",
        !disabled && (isChecked ? "hover:bg-main-300" : "hover:bg-gray-100"),
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    >
      {showCheckIndicator ? (
        <span
          className={cn(
            "absolute top-4 right-4 flex w-[clamp(18px,8%,32px)] aspect-square shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            isChecked
              ? "border-main-800 bg-main-800 text-white"
              : "border-gray-300 bg-white text-transparent",
          )}
        >
          <Check className="h-[46%] w-[46%]" strokeWidth={4.4} />
        </span>
      ) : null}

      {hasCustomChildren ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          {icon ? (
            <span className="text-inherit [&>svg]:h-14 [&>svg]:w-14">
              {icon}
            </span>
          ) : null}
          {typeof label === "string" || typeof label === "number" ? (
            <Text
              size="heading1"
              weight="bold"
              className={cn(
                "text-inherit",
                isChecked ? "text-main-800" : "text-gray-600",
              )}
            >
              {label}
            </Text>
          ) : (
            label
          )}
        </div>
      )}
    </button>
  );
}
