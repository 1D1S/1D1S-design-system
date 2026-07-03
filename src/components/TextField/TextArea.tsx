"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { TextField } from "./TextField";

export type TextAreaSize = "sm" | "md" | "lg";

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: React.ReactNode;
  labelHint?: React.ReactNode;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  /** 사이즈 — `sm`·`md`(default)·`lg`. 글자 크기·패딩·최소 높이 조절 */
  size?: TextAreaSize;
  /** 우하단 글자수 카운터 표시 */
  count?: boolean;
  /** maxLength — count와 함께 쓰면 `n/max` 표시 */
  max?: number;
  /** 부모 너비 100% (default `true`). false면 380px */
  full?: boolean;
}

/** 사이즈별 최소 높이 (TextField multiline 위에 덮어쓰기) */
const MIN_HEIGHT: Record<TextAreaSize, string> = {
  sm: "min-h-[64px]",
  md: "min-h-[80px]",
  lg: "min-h-[96px]",
};

/**
 * TextArea
 * 다중 행 입력 — 글자수 카운터, label/helper/error 지원.
 * TextField의 `multiline` 모드를 감싼 얇은 래퍼다.
 *
 * @example
 * ```tsx
 * <TextArea placeholder="오늘 챌린지 어떠셨나요?" rows={4} count max={500} />
 * ```
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, size = "md", count, max, full = true, maxLength, ...rest },
    ref,
  ) => (
    <div className={full ? "w-full" : "w-[380px]"}>
      <TextField
        ref={ref as React.Ref<HTMLInputElement | HTMLTextAreaElement>}
        multiline
        size={size}
        count={count}
        maxLength={maxLength ?? max}
        className={cn(MIN_HEIGHT[size], className)}
        // ponytail: rest는 textarea 속성(onChange 이벤트 타입만 다름) — 경계에서 한 번 캐스팅
        {...(rest as React.ComponentPropsWithoutRef<typeof TextField>)}
      />
    </div>
  ),
);

TextArea.displayName = "TextArea";
