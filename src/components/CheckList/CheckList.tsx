"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";
import { Checkbox } from "../Checkbox";

export type CheckListSize = "sm" | "md" | "lg";
export type CheckListVariant = "flat" | "card";

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
  /**
   * 스타일 변형 — `flat`(default): 여백만 있는 플랫 행(읽기 전용 표시용),
   * `card`: 행마다 보더 박스(체크 인터랙션용)
   */
  variant?: CheckListVariant;
  /** 추가 클래스 */
  className?: string;
  /** 읽기 전용 여부 (시각 변화 없이 토글만 비활성화) */
  readOnly?: boolean;
  /** 전체 비활성화 여부 */
  disabled?: boolean;
  /**
   * 체크 시 채움/보더 색 (CSS color) — 미지정 시 green-600.
   * 예: `var(--color-brand)`, `#8dc71e`
   */
  checkColor?: string;
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
  /* 행 py-1.5(12px)가 시각 간격에 포함되므로 list gap 은 그만큼 낮게 잡는다:
     텍스트 간 간격 = gap + 12px → sm 12 / md 14 / lg 16px 유지 */
  sm: {
    list: "gap-0",
    row: "gap-2.5",
    checkbox: "h-[18px] w-[18px]",
    label: "body2",
  },
  md: { list: "gap-0.5", row: "gap-3", checkbox: "h-5 w-5", label: "body1" },
  lg: { list: "gap-1", row: "gap-3", checkbox: "h-6 w-6", label: "body1" },
};

/** card 변형 — 행마다 보더 박스, 리스트 간격은 고정 12px */
const CARD_CONFIG: Record<CheckListSize, { list: string; row: string }> = {
  sm: { list: "gap-2.5", row: "px-3.5 py-3" },
  md: { list: "gap-3", row: "px-4 py-3.5" },
  lg: { list: "gap-3", row: "px-4 py-4" },
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
  variant = "flat",
  className,
  readOnly = false,
  disabled = false,
  checkColor,
}: CheckListProps): React.ReactElement {
  const baseId = React.useId();
  const sizeConfig = SIZE_CONFIG[size];
  const cardConfig = CARD_CONFIG[size];
  const isCard = variant === "card";

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
        "stagger-in flex flex-col",
        isCard ? cardConfig.list : sizeConfig.list,
        className
      )}
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
              "flex w-full items-center text-left",
              /* 임의값 transition-[...] 은 소비처 Tailwind 스캔에서 누락될 수
                 있어 표준 유틸리티 사용 — press scale 이 부드럽게 전환된다 */
              "transition duration-200 ease-out",
              isCard
                ? cn(
                    "rounded-3 border border-gray-200 bg-white",
                    cardConfig.row
                  )
                : "-mx-2.5 rounded-2 px-2.5 py-1.5",
              sizeConfig.row,
              !isInteractionBlocked && "cursor-pointer active:scale-[0.97]",
              !isInteractionBlocked &&
                (isCard ? "hover:bg-gray-50" : "hover:bg-gray-100"),
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
              /* checkColor 지정 시 인라인으로 채움/보더 색을 덮어쓴다.
                 (미지정 시 아래 green-600 클래스가 적용된다) */
              style={
                checkColor && isChecked
                  ? { backgroundColor: checkColor, borderColor: checkColor }
                  : undefined
              }
              className={cn(
                sizeConfig.checkbox,
                "rounded-full",
                !checkColor &&
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
