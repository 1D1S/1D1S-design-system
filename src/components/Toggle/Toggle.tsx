"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: React.ReactNode;
  /** 라벨 위치 */
  labelPosition?: "left" | "right";
}

/**
 * Toggle v3
 * 38×22 알약형 스위치. on=brand bg, off=gray-300, 흰색 노브.
 *
 * @example
 * ```tsx
 * <Toggle defaultChecked label="알림 켜짐" />
 * <Toggle label="공개" labelPosition="left" />
 * ```
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      className,
      label,
      labelPosition = "right",
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const switchEl = (
      <span className="relative inline-flex h-[22px] w-[38px] shrink-0 items-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none rounded-full bg-gray-300 outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 checked:bg-brand disabled:cursor-not-allowed"
          {...props}
        />
        <span className="pointer-events-none absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-full bg-white shadow-knob transition-transform duration-150 ease-out peer-checked:translate-x-4" />
      </span>
    );

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 select-none",
          disabled && "cursor-not-allowed opacity-[0.45]",
          className,
        )}
      >
        {label && labelPosition === "left" ? (
          <Text size="caption2" weight="medium" className="text-gray-800">
            {label}
          </Text>
        ) : null}
        {switchEl}
        {label && labelPosition === "right" ? (
          <Text size="caption2" weight="medium" className="text-gray-800">
            {label}
          </Text>
        ) : null}
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
