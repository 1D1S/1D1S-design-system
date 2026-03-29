"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Close } from "../Icons";
import { Text } from "../Text";
import { TextField } from "../TextField";

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
  const isComposingRef = React.useRef(false);

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
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {goalList.map((goal, index) => (
        <div
          key={`${goal}-${index}`}
          className="flex h-10 w-full items-center justify-between rounded-3 border border-gray-300 bg-white px-5"
        >
          <Text size="body2" weight="regular" className="line-clamp-1 text-gray-900">
            {goal}
          </Text>

          <button
            type="button"
            aria-label={`목표 삭제: ${goal}`}
            disabled={disabled}
            onClick={() => removeGoal(index)}
            className={cn(
              "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-2 text-gray-500 transition-colors hover:cursor-pointer",
              !disabled && "hover:bg-gray-100 hover:text-gray-700",
              disabled && "cursor-not-allowed text-gray-400"
            )}
          >
            <Close className="h-4 w-4" />
          </button>
        </div>
      ))}

      <TextField
        value={draft}
        disabled={disabled}
        aria-label={inputAriaLabel}
        placeholder={placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onCompositionEnd={() => {
          isComposingRef.current = false;
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          if (
            event.nativeEvent.isComposing ||
            isComposingRef.current ||
            event.nativeEvent.keyCode === 229
          ) {
            return;
          }
          event.preventDefault();
          commitDraft();
        }}
        onBlur={() => {
          if (!addOnBlur) return;
          commitDraft();
        }}
      />
    </div>
  );
}
