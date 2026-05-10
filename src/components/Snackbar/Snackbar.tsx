"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 표시 텍스트 */
  text: React.ReactNode;
  /** 우측 인라인 액션 라벨 (예: "복구") */
  action?: React.ReactNode;
  /** 액션 클릭 콜백 */
  onAction?: () => void;
}

/**
 * Snackbar
 * 컴팩트한 다크 톤 알림 — 보통 화면 하단에 1줄 결과 + 1액션 형태로 표시.
 *
 * @example
 * ```tsx
 * <Snackbar text="일지가 임시저장되었어요" action="복구" onAction={() => restore()} />
 * <Snackbar text="링크를 복사했어요" />
 * ```
 */
export function Snackbar({
  text,
  action,
  onAction,
  className,
  ...props
}: SnackbarProps): React.ReactElement {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-4 px-4 py-3",
        "rounded-2.5 bg-gray-900 text-white shadow-lg",
        "text-sm font-semibold",
        className,
      )}
      {...props}
    >
      <span>{text}</span>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="bg-transparent text-main-500 font-extrabold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-main-500/40 rounded-1"
        >
          {action}
        </button>
      )}
    </div>
  );
}
