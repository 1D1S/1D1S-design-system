"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export type TextAreaSize = "sm" | "md" | "lg";

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: React.ReactNode;
  labelHint?: React.ReactNode;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  /** 사이즈 — `sm`·`md`(default)·`lg`. 글자 크기·패딩·최소 높이 조절 */
  size?: TextAreaSize;
  /** 우하단 글자수 카운터 표시 */
  count?: boolean;
  /** maxLength — count와 함께 쓰면 `n/max` 표시 */
  max?: number;
  /** 부모 너비 100% (default `true`). false면 380px */
  full?: boolean;
}

/** 사이즈별 글자 크기·패딩·최소 높이 (TextField 사이즈 스케일과 정렬) */
const SIZE_CLASS: Record<TextAreaSize, string> = {
  sm: "min-h-[64px] px-3 py-2.5 text-xs",
  md: "min-h-[80px] px-3.5 py-3 text-sm",
  lg: "min-h-[96px] px-4 py-3.5 text-base",
};

/**
 * TextArea
 * 다중 행 입력 — 글자수 카운터, label/helper/error 지원.
 *
 * @example
 * ```tsx
 * <TextArea placeholder="오늘 챌린지 어떠셨나요?" rows={4} count max={500} />
 * ```
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      labelHint,
      helper,
      error,
      count,
      max,
      size = "md",
      full = true,
      rows = 4,
      defaultValue,
      value,
      onChange,
      required,
      disabled,
      id,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const fieldId = id || generatedId;
    const isControlled = value !== undefined;
    const [inner, setInner] = React.useState<string>(
      typeof defaultValue === "string" ? defaultValue : "",
    );
    const current = (isControlled ? value : inner) as string;
    const len = current ? String(current).length : 0;

    return (
      <div className={cn("flex flex-col", full ? "w-full" : "w-[380px]")}>
        {label ? (
          <label
            htmlFor={fieldId}
            className="mb-1.5 inline-flex items-center gap-1.5"
          >
            <Text size="caption3" weight="bold" className="text-gray-700">
              {label}
            </Text>
            {required ? (
              <Text size="caption3" weight="bold" className="text-brand">
                *
              </Text>
            ) : null}
            {labelHint ? (
              <Text size="caption3" weight="regular" className="text-gray-500">
                {labelHint}
              </Text>
            ) : null}
          </label>
        ) : null}

        <div className="relative w-full">
          <textarea
            id={fieldId}
            ref={ref}
            rows={rows}
            value={isControlled ? value : inner}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={(e) => {
              if (!isControlled) setInner(e.target.value);
              onChange?.(e);
            }}
            maxLength={maxLength ?? max}
            required={required}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={cn(
              "w-full resize-y rounded-2.5 border border-gray-200 bg-white leading-[1.6] text-gray-900",
              SIZE_CLASS[size],
              "outline-none transition-[border-color,box-shadow,background-color] duration-200",
              "placeholder:text-gray-500 hover:border-gray-400",
              "focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400",
              "aria-[invalid=true]:border-red-500 aria-[invalid=true]:shadow-focus-error",
              count && "pb-7",
              className,
            )}
            {...props}
          />
          {count ? (
            <div className="pointer-events-none absolute right-3 bottom-2.5 text-2xs font-semibold tabular-nums text-gray-500">
              {len}
              {max ? `/${max}` : ""}
            </div>
          ) : null}
        </div>

        {error || helper ? (
          <Text
            size="caption3"
            weight="regular"
            className={cn(
              "mt-1.5",
              error ? "text-red-500" : "text-gray-500",
            )}
          >
            {error || helper}
          </Text>
        ) : null}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
