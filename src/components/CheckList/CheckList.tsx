"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";
import { Checkbox } from "../Checkbox";

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
  /** 추가 클래스 */
  className?: string;
  /** 전체 비활성화 여부 */
  disabled?: boolean;
}

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
  className,
  disabled = false,
}: CheckListProps): React.ReactElement {
  const baseId = React.useId();

  const handleToggle = (id: string, nextChecked: boolean): void => {
    if (nextChecked) {
      onValueChange(value.includes(id) ? value : [...value, id]);
      return;
    }

    onValueChange(value.filter((item) => item !== id));
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-4 border border-gray-200 bg-white",
        className
      )}
    >
      {options.map((option, index) => {
        const isChecked = value.includes(option.id);
        const isDisabled = disabled || option.disabled;
        const optionId = `${baseId}-${option.id}`;

        return (
          <div
            key={option.id}
            role="group"
            aria-disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              handleToggle(option.id, !isChecked);
            }}
            className={cn(
              "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors",
              index > 0 && "border-t border-gray-200",
              !isDisabled && "cursor-pointer hover:bg-gray-100/70",
              isDisabled && "cursor-not-allowed"
            )}
          >
            <Checkbox
              id={optionId}
              checked={isChecked}
              disabled={isDisabled}
              onClick={(event) => {
                event.stopPropagation();
              }}
              onCheckedChange={(checkedState) => {
                if (isDisabled || checkedState === "indeterminate") return;
                handleToggle(option.id, checkedState === true);
              }}
              className={cn(
                "h-[22px] w-[22px] rounded-1.5",
                "data-[state=checked]:border-main-800 data-[state=checked]:bg-main-800"
              )}
            />

            {typeof option.label === "string" || typeof option.label === "number" ? (
              <Text
                size="heading2"
                weight="medium"
                className={cn(
                  "transition-colors",
                  isChecked ? "text-gray-900" : "text-gray-500",
                  isDisabled && "text-gray-400"
                )}
              >
                {option.label}
              </Text>
            ) : (
              <span className={cn(!isChecked && "text-gray-500", isDisabled && "opacity-60")}>
                {option.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
