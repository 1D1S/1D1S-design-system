"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";

export interface CommentRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 좌측 아바타 슬롯 (CircleAvatar 등). 미지정 시 imageUrl로 자동 생성 */
  avatar?: React.ReactNode;
  /** avatar 미지정 시 사용할 이미지 URL */
  imageUrl?: string;
  /** 작성자 이름 */
  author: React.ReactNode;
  /** 댓글 본문 */
  text: React.ReactNode;
  /** 작성 시간 (예: "1시간 전") */
  time?: React.ReactNode;
  /** 하단 구분선 표시 (default `true`) */
  divider?: boolean;
}

/**
 * CommentRow
 * 한 줄 댓글 — 응원 / 단순 댓글 리스트용. 중첩이 필요하면 `CommentThread` 사용.
 *
 * @example
 * ```tsx
 * <CommentRow
 *   imageUrl="/users/min.jpg"
 *   author="새벽러너"
 *   text="5km 축하드려요! 🏃"
 *   time="1시간 전"
 * />
 * ```
 */
export function CommentRow({
  avatar,
  imageUrl,
  author,
  text,
  time,
  divider = true,
  className,
  ...props
}: CommentRowProps): React.ReactElement {
  return (
    <div
      data-slot="comment-row"
      className={cn(
        "flex items-start gap-2.5 py-3",
        divider && "border-b border-gray-100 last:border-b-0",
        className,
      )}
      {...props}
    >
      <div className="shrink-0">
        {avatar ?? <CircleAvatar imageUrl={imageUrl} size="sm" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-bold text-gray-900 truncate">{author}</span>
          {time ? (
            <span className="shrink-0 text-3xs text-gray-500">{time}</span>
          ) : null}
        </div>
        <div className="mt-1 text-xs leading-[1.5] text-gray-700">{text}</div>
      </div>
    </div>
  );
}
