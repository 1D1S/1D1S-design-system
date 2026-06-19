"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronDown } from "../Icons/ChevronDown";

const dropdownTriggerVariants = cva(
  [
    "inline-flex w-full items-center justify-between rounded-2 border bg-white text-gray-900 font-medium",
    "transition-[border-color,box-shadow,background-color] duration-150 ease-out outline-none",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-[38px] px-3.5 text-sm",
        lg: "h-[46px] px-4 text-base",
      },
      open: {
        true: "border-brand shadow-focus",
        false: "border-gray-200 hover:border-gray-300",
      },
    },
    defaultVariants: { size: "md", open: false },
  },
);

export interface DropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "value">,
    VariantProps<typeof dropdownTriggerVariants> {
  /** 라벨 (위) */
  label?: React.ReactNode;
  /** 현재 선택값 */
  value?: React.ReactNode;
  /** 미선택 시 표시할 placeholder */
  placeholder?: React.ReactNode;
  /** 부모 너비 100%. false면 240px */
  full?: boolean;
}

/**
 * Dropdown
 * 셀렉트형 버튼 — 우측 chevron, open 상태에서 brand 보더 + main 글로우.
 *
 * @param size `sm` · `md` (default) · `lg`
 * @param open 메뉴 열림 시각 상태 (실제 메뉴 렌더링은 별도)
 *
 * @example
 * ```tsx
 * <Dropdown value="인기순" />
 * <Dropdown placeholder="카테고리 선택" />
 * <Dropdown value="운동" open />
 * ```
 */
export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      className,
      size,
      open,
      label,
      value,
      placeholder = "선택",
      full = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isPlaceholder = value == null || value === "";
    const id = React.useId();
    return (
      <div className={cn(full ? "w-full" : "w-60")}>
        {label ? (
          <label
            htmlFor={id}
            className="mb-1.5 inline-block text-2xs font-bold text-gray-700"
          >
            {label}
          </label>
        ) : null}
        <button
          ref={ref}
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open ? true : false}
          className={cn(
            dropdownTriggerVariants({ size, open }),
            isPlaceholder && "text-gray-400 font-normal",
            className,
          )}
          {...props}
        >
          <span className="truncate">{isPlaceholder ? placeholder : value}</span>
          <ChevronDown
            width={14}
            height={14}
            className={cn(
              "ml-2 shrink-0 transition-transform duration-150",
              open && "rotate-180",
              disabled ? "text-gray-400" : "text-gray-500",
            )}
            strokeWidth={2}
          />
        </button>
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";
