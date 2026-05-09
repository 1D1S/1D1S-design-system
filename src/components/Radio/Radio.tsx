"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: React.ReactNode;
}

/**
 * Radio v3
 * 18×18 원형 라디오 버튼. 체크 시 brand 컬러 외곽선 + 9×9 brand 내부 점.
 *
 * @example
 * ```tsx
 * <Radio name="type" value="solo" defaultChecked label="개인 챌린지" />
 * <Radio name="type" value="group" label="단체 챌린지" />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 select-none",
          disabled && "cursor-not-allowed opacity-[0.45]",
          className,
        )}
      >
        <span className="relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            className="peer absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none rounded-full border-[1.5px] border-gray-300 bg-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 checked:border-brand"
            {...props}
          />
          <span className="pointer-events-none h-[9px] w-[9px] scale-0 rounded-full bg-brand transition-transform duration-150 ease-out peer-checked:scale-100" />
        </span>
        {label ? (
          <Text size="caption2" weight="medium" className="text-gray-800">
            {label}
          </Text>
        ) : null}
      </label>
    );
  },
);

Radio.displayName = "Radio";

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  /** 모든 Radio가 공유하는 name (group 식별자) */
  name: string;
  /** 옵션 리스트 — value/label */
  options: Array<{ value: string; label: React.ReactNode; disabled?: boolean }>;
  /** 현재 선택값 (controlled) */
  value?: string;
  /** 기본값 (uncontrolled) */
  defaultValue?: string;
  /** 변경 콜백 */
  onChange?: (value: string) => void;
  /** 항목 사이 간격 / 방향 */
  direction?: "vertical" | "horizontal";
}

/**
 * RadioGroup
 * 단일 선택 라디오 그룹. controlled/uncontrolled 둘 다 지원.
 *
 * @example
 * ```tsx
 * <RadioGroup name="type" defaultValue="solo" options={[
 *   { value: 'solo', label: '개인 챌린지' },
 *   { value: 'group', label: '단체 챌린지' },
 * ]} />
 * ```
 */
export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  direction = "vertical",
  className,
  ...props
}: RadioGroupProps): React.ReactElement {
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState<string | undefined>(defaultValue);
  const current = isControlled ? value : inner;
  return (
    <div
      role="radiogroup"
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col gap-2" : "flex-row gap-4",
        className,
      )}
      {...props}
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          checked={current === opt.value}
          disabled={opt.disabled}
          onChange={(e) => {
            if (!isControlled) setInner(opt.value);
            onChange?.(opt.value);
            if (e.currentTarget) {
              /* keep React happy */
            }
          }}
          label={opt.label}
        />
      ))}
    </div>
  );
}
