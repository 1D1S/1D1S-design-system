"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export type TextFieldState =
  | "default"
  | "focus"
  | "filled"
  | "error"
  | "disabled";

const fieldVariants = cva(
  [
    "w-full transition-[border-color,box-shadow,background-color] duration-150 ease-out outline-none",
    "rounded-2 border border-gray-200 bg-white text-gray-900",
    "placeholder:text-gray-500",
    // automatic states (used when `state` prop omitted)
    "hover:border-gray-300",
    "focus-visible:border-brand focus-visible:shadow-focus",
    "disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400",
    "aria-[invalid=true]:border-red-500 aria-[invalid=true]:shadow-focus-error",
  ],
  {
    variants: {
      size: {
        xs: "h-[26px] text-2xs",
        sm: "h-8 text-xs",
        md: "h-[38px] text-sm",
        lg: "h-[46px] text-base",
        xl: "h-[54px] text-lg",
      },
      hasIconLeft: { true: "", false: "" },
      hasSuffix: { true: "", false: "" },
      multiline: {
        false: "",
        true: "h-auto min-h-[80px] resize-y align-top leading-[1.6] rounded-2.5",
      },
      // controlled visual state — overrides automatic states
      state: {
        default: "",
        focus:
          "border-brand shadow-focus",
        filled: "border-gray-300",
        error:
          "border-red-500 shadow-focus-error",
        disabled:
          "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400",
      },
    },
    compoundVariants: [
      // — single-line, no slot — symmetric padding by size
      { multiline: false, hasIconLeft: false, hasSuffix: false, size: "xs", class: "px-2.5" },
      { multiline: false, hasIconLeft: false, hasSuffix: false, size: "sm", class: "px-3" },
      { multiline: false, hasIconLeft: false, hasSuffix: false, size: "md", class: "px-3.5" },
      { multiline: false, hasIconLeft: false, hasSuffix: false, size: "lg", class: "px-4" },
      { multiline: false, hasIconLeft: false, hasSuffix: false, size: "xl", class: "px-5" },

      // — iconLeft only — fixed 36px left gutter + size-specific right
      { multiline: false, hasIconLeft: true, hasSuffix: false, size: "xs", class: "pl-9 pr-2.5" },
      { multiline: false, hasIconLeft: true, hasSuffix: false, size: "sm", class: "pl-9 pr-3" },
      { multiline: false, hasIconLeft: true, hasSuffix: false, size: "md", class: "pl-9 pr-3.5" },
      { multiline: false, hasIconLeft: true, hasSuffix: false, size: "lg", class: "pl-9 pr-4" },
      { multiline: false, hasIconLeft: true, hasSuffix: false, size: "xl", class: "pl-9 pr-5" },

      // — suffix only — size-specific left + fixed 36px right gutter
      { multiline: false, hasIconLeft: false, hasSuffix: true, size: "xs", class: "pl-2.5 pr-9" },
      { multiline: false, hasIconLeft: false, hasSuffix: true, size: "sm", class: "pl-3 pr-9" },
      { multiline: false, hasIconLeft: false, hasSuffix: true, size: "md", class: "pl-3.5 pr-9" },
      { multiline: false, hasIconLeft: false, hasSuffix: true, size: "lg", class: "pl-4 pr-9" },
      { multiline: false, hasIconLeft: false, hasSuffix: true, size: "xl", class: "pl-5 pr-9" },

      // — both — both gutters fixed
      { multiline: false, hasIconLeft: true, hasSuffix: true, class: "pl-9 pr-9" },

      // — multiline — symmetric padding all around
      { multiline: true, size: "xs", class: "p-2.5" },
      { multiline: true, size: "sm", class: "p-3" },
      { multiline: true, size: "md", class: "p-3.5" },
      { multiline: true, size: "lg", class: "p-4" },
      { multiline: true, size: "xl", class: "p-5" },
    ],
    defaultVariants: {
      size: "md",
      hasIconLeft: false,
      hasSuffix: false,
      multiline: false,
      state: "default",
    },
  },
);

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof fieldVariants> {
  label?: React.ReactNode;
  labelHint?: React.ReactNode;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  /** prefix 아이콘 (왼쪽) */
  iconLeft?: React.ReactNode;
  /** suffix 텍스트/노드 (오른쪽 — 글자수, 단위 등) */
  suffix?: React.ReactNode;
  /** suffix 대신 자유 노드 — iconRight (suffix와 동일 자리) */
  iconRight?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  cols?: number;
}

function FieldLabel({
  label,
  labelHint,
  required,
  htmlFor,
}: {
  label?: React.ReactNode;
  labelHint?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}): React.ReactElement | null {
  if (!label) return null;
  return (
    <label htmlFor={htmlFor} className="mb-1.5 inline-flex items-center gap-1.5">
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
  );
}

/**
 * TextField v3.1
 * 입력 필드 — 라벨 / 아이콘 / suffix / 헬퍼·에러 / 5단 사이즈 / 5 visual state.
 *
 * @param size `xs`(26)·`sm`(32)·`md`(38, default)·`lg`(46)·`xl`(54)
 * @param state 비주얼 강제 — `default`·`focus`·`filled`·`error`·`disabled` (스토리북 데모/디자인 토큰용)
 * @param suffix 우측 텍스트 (글자수/단위 등)
 * @param helper / `error` 하단 안내 — error가 있으면 helper 무시
 *
 * @example
 * ```tsx
 * <TextField label="이메일" iconLeft={<Mail />} placeholder="email@..." helper="가입 메일" />
 * <TextField label="목표" defaultValue="아침 30분" suffix="6/20" />
 * <TextField label="기간" defaultValue="14" suffix="일" size="sm" />
 * ```
 */
export const TextField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(
  (
    {
      className,
      size,
      state,
      label,
      labelHint,
      helper,
      error,
      type,
      iconLeft,
      iconRight,
      suffix,
      multiline = false,
      rows = 8,
      cols,
      required,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const hasIconLeft = Boolean(iconLeft) && !multiline;
    const rightSlot = suffix ?? iconRight;
    const hasSuffix = Boolean(rightSlot) && !multiline;
    const resolvedState = error ? "error" : disabled ? "disabled" : state;

    const fieldClass = cn(
      fieldVariants({
        size,
        hasIconLeft,
        hasSuffix,
        multiline,
        state: resolvedState,
      }),
      className,
    );

    return (
      <div className="flex w-full flex-col">
        <FieldLabel
          label={label}
          labelHint={labelHint}
          required={required}
          htmlFor={id}
        />

        <div className="relative w-full">
          {hasIconLeft && (
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center",
                resolvedState === "focus" ? "text-brand" : "text-gray-400",
              )}
            >
              {iconLeft}
            </span>
          )}
          {hasSuffix && (
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 text-gray-500 text-xs font-semibold"
            >
              {rightSlot}
            </span>
          )}

          {multiline ? (
            <textarea
              id={id}
              rows={rows}
              cols={cols}
              required={required}
              disabled={disabled}
              aria-invalid={error ? true : undefined}
              className={fieldClass}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              {...(props as Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">)}
            />
          ) : (
            <input
              id={id}
              type={type}
              required={required}
              disabled={disabled}
              aria-invalid={error ? true : undefined}
              className={fieldClass}
              ref={ref as React.Ref<HTMLInputElement>}
              {...props}
            />
          )}
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

TextField.displayName = "TextField";
