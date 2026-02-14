"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Close } from "../Icons";
import { Text } from "../Text";

export interface GoalAddListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  goals?: string[];
  defaultGoals?: string[];
  onGoalsChange?(goals: string[]): void;
  placeholder?: string;
  disabled?: boolean;
  addOnBlur?: boolean;
  inputAriaLabel?: string;
}

/**
 * GoalAddList
 * 목표 문자열 목록을 보여주고 하단 입력창에서 Enter로 새 목표를 추가하는 컴포넌트.
 */
export function GoalAddList({
  goals,
  defaultGoals = [],
  onGoalsChange,
  placeholder = "목표를 입력하세요",
  disabled = false,
  addOnBlur = false,
  inputAriaLabel = "목표 입력",
  className,
  ...props
}: GoalAddListProps): React.ReactElement {
  const isControlled = goals !== undefined;
  const [internalGoals, setInternalGoals] = React.useState<string[]>(defaultGoals);
  const [draft, setDraft] = React.useState("");

  const goalList = isControlled ? goals : internalGoals;

  const updateGoals = (nextGoals: string[]): void => {
    if (!isControlled) {
      setInternalGoals(nextGoals);
    }
    onGoalsChange?.(nextGoals);
  };

  const commitDraft = (): void => {
    if (disabled) return;

    const nextLabel = draft.trim();
    if (!nextLabel) return;

    updateGoals([...goalList, nextLabel]);
    setDraft("");
  };

  const removeGoal = (index: number): void => {
    if (disabled) return;
    updateGoals(goalList.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className={cn("flex w-full flex-col gap-4", className)} {...props}>
      {goalList.map((goal, index) => (
        <div
          key={`${goal}-${index}`}
          className="flex h-16 w-full items-center justify-between rounded-4 border border-gray-300 bg-white px-5"
        >
          <Text size="body1" weight="bold" className="line-clamp-1 text-gray-900">
            {goal}
          </Text>

          <button
            type="button"
            aria-label={`목표 삭제: ${goal}`}
            disabled={disabled}
            onClick={() => removeGoal(index)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-2 text-gray-600 transition-colors",
              !disabled && "hover:bg-gray-100 hover:text-gray-700",
              disabled && "cursor-not-allowed text-gray-400"
            )}
          >
            <Close className="h-5 w-5" />
          </button>
        </div>
      ))}

      <input
        type="text"
        value={draft}
        disabled={disabled}
        aria-label={inputAriaLabel}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          commitDraft();
        }}
        onBlur={() => {
          if (!addOnBlur) return;
          commitDraft();
        }}
        className={cn(
          "h-16 w-full rounded-4 border border-gray-300 bg-white px-5",
          "text-xl font-medium text-gray-900 placeholder:text-gray-500",
          "outline-none transition-all duration-200",
          "focus-visible:border-main-500 focus-visible:ring-3 focus-visible:ring-main-300/60",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />
    </div>
  );
}
