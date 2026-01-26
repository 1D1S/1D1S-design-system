"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { ToggleCheck } from "../ToggleCheck";

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
 * 여러 개의 ToggleCheck를 리스트 형태로 보여주고 다중 선택을 관리하는 컴포넌트
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
  const handlePressedChange = (id: string, pressed: boolean) => {
    if (pressed) {
      onValueChange([...value, id]);
    } else {
      onValueChange(value.filter((item) => item !== id));
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {options.map((option) => (
        <ToggleCheck
          key={option.id}
          pressed={value.includes(option.id)}
          onPressedChange={(pressed) => handlePressedChange(option.id, pressed)}
          disabled={option.disabled || disabled}
        >
          {option.label}
        </ToggleCheck>
      ))}
    </div>
  );
}
