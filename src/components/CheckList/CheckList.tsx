"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";
import { Checkbox } from "../Checkbox";

export type CheckListSize = "sm" | "md" | "lg";

export interface CheckListOption {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface CheckListProps {
  /** 체크박스 옵션 목록 */
  options: CheckListOption[];
  /** 선택된 옵션의 ID 목록 */
  value: string[];
  /** 선택 변경 시 호출되는 콜백 */
  onValueChange: (value: string[]) => void;
  /** 사이즈 — `sm`·`md`(default)·`lg` */
  size?: CheckListSize;
  /** 추가 클래스 */
  className?: string;
  /** 읽기 전용 여부 (시각 변화 없이 토글만 비활성화) */
  readOnly?: boolean;
  /** 전체 비활성화 여부 */
  disabled?: boolean;
}

/** 사이즈별 리스트·행 간격 / 체크박스 크기 / 라벨 텍스트 사이즈 */
const SIZE_CONFIG: Record<
  CheckListSize,
  {
    list: string;
    row: string;
    checkbox: string;
    label: "caption1" | "body2" | "body1";
  }
> = {
  sm: {
    list: "gap-3",
    row: "gap-2.5",
    checkbox: "h-[18px] w-[18px]",
    label: "body2",
  },
  md: { list: "gap-3.5", row: "gap-3", checkbox: "h-5 w-5", label: "body1" },
  lg: { list: "gap-4", row: "gap-3", checkbox: "h-6 w-6", label: "body1" },
};

/**
 * CheckList
 * 여러 개의 Checkbox를 리스트 형태로 보여주고 다중 선택을 관리하는 컴포넌트
 *
 * @example
 * ```tsx
 * <CheckList
 *   options={[
 *     { id: '1', label: '옵션 1' },
 *     { id: '2', label: '옵션 2' }
 *   ]}
 *   value={selectedIds}
 *   onValueChange={setSelectedIds}
 * />
 * ```
 */
export function CheckList({
  options,
  value,
  onValueChange,
  size = "md",
  className,
  readOnly = false,
  disabled = false,
}: CheckListProps): React.ReactElement {
  const baseId = React.useId();
  const sizeConfig = SIZE_CONFIG[size];

  const handleToggle = (id: string, nextChecked: boolean): void => {
    if (nextChecked) {
      onValueChange(value.includes(id) ? value : [...value, id]);
      return;
    }

    onValueChange(value.filter((item) => item !== id));
  };

  return (
    <div
      className={cn("stagger-in flex flex-col", sizeConfig.list, className)}
    >
      {options.map((option) => {
        const isChecked = value.includes(option.id);
        const isDisabled = disabled || option.disabled;
        const isReadOnly = !isDisabled && readOnly;
        const isInteractionBlocked = isDisabled || isReadOnly;
        const optionId = `${baseId}-${option.id}`;

        return (
          <label
            key={option.id}
            htmlFor={optionId}
            aria-disabled={isInteractionBlocked}
            onClick={(event) => {
              if (!isInteractionBlocked) return;
              event.preventDefault();
            }}
            className={cn(
              "flex w-full items-center text-left transition-colors",
              sizeConfig.row,
              !isInteractionBlocked && "cursor-pointer",
              isDisabled && "cursor-not-allowed",
              isReadOnly && "cursor-default hover:cursor-not-allowed"
            )}
          >
            <Checkbox
              id={optionId}
              checked={isChecked}
              disabled={isDisabled}
              onCheckedChange={(checkedState) => {
                if (isInteractionBlocked || checkedState === "indeterminate") return;
                handleToggle(option.id, checkedState === true);
              }}
              className={cn(
                sizeConfig.checkbox,
                "rounded-full",
                "data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600",
                isReadOnly && "cursor-default hover:cursor-not-allowed"
              )}
            />

            {typeof option.label === "string" || typeof option.label === "number" ? (
              <Text
                size={sizeConfig.label}
                weight={isChecked ? "bold" : "medium"}
                className={cn(
                  "flex-1 transition-colors",
                  isChecked ? "text-gray-900" : "text-gray-500",
                  isDisabled && "text-gray-400"
                )}
              >
                {option.label}
              </Text>
            ) : (
              <span
                className={cn(
                  "flex-1",
                  !isChecked && "text-gray-600",
                  isDisabled && "opacity-60"
                )}
              >
                {option.label}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
