"use client";

import * as Popover from "@radix-ui/react-popover";
import React from "react";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";
import { Text } from "../Text";

const MAX_VISIBLE_REPLIES = 5;

export interface CommentAuthor {
  id: string;
  nickname: string;
  profileImageUrl?: string;
}

export interface CommentNode {
  id: string;
  content: string;
  createdAt: string;
  author: CommentAuthor;
  replies?: CommentNode[];
  isAuthor?: boolean;
}

export interface CommentThreadProps {
  comments: CommentNode[];
  currentUserId?: string;
  className?: string;
  replyPlaceholder?: string;
  replySubmitLabel?: string;
  replyCancelLabel?: string;
  onEdit?(comment: CommentNode): void;
  onDelete?(comment: CommentNode): void;
  onReport?(comment: CommentNode): void;
  onReplySubmit?(comment: CommentNode, content: string): void;
}

interface CommentActionsMenuProps {
  comment: CommentNode;
  isAuthor: boolean;
  onEdit?(comment: CommentNode): void;
  onDelete?(comment: CommentNode): void;
  onReport?(comment: CommentNode): void;
}

function CommentActionsMenu({
  comment,
  isAuthor,
  onEdit,
  onDelete,
  onReport,
}: CommentActionsMenuProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const actionItems = isAuthor
    ? [
        {
          key: "edit",
          label: "수정",
          onClick: () => onEdit?.(comment),
          className: "text-gray-700",
        },
        {
          key: "delete",
          label: "삭제",
          onClick: () => onDelete?.(comment),
          className: "text-red-600",
        },
      ]
    : [
        {
          key: "report",
          label: "신고",
          onClick: () => onReport?.(comment),
          className: "text-red-600",
        },
      ];

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label="댓글 더보기 메뉴"
          onClick={(event) => event.stopPropagation()}
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            "text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700",
          )}
        >
          <span className="sr-only">더보기</span>
          <span className="flex items-center gap-0.5">
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={6}
          className={cn(
            "z-50 min-w-[120px] overflow-hidden rounded-3 border border-gray-200 bg-white p-1.5 shadow-sm",
            "data-[state=closed]:animate-out data-[state=open]:animate-in",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
        >
          <div className="flex flex-col gap-0.5">
            {actionItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={cn(
                  "rounded-2 px-3 py-2 text-left transition-colors hover:bg-gray-100",
                  item.className,
                )}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
              >
                <Text size="caption1" weight="medium">
                  {item.label}
                </Text>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function CommentItem({
  comment,
  depth,
  currentUserId,
  activeReplyTargetId,
  draftReplyContent,
  replyPlaceholder,
  replySubmitLabel,
  replyCancelLabel,
  onReplyOpen,
  onReplyChange,
  onReplySubmit,
  onReplyCancel,
  onEdit,
  onDelete,
  onReport,
}: {
  comment: CommentNode;
  depth: number;
  currentUserId?: string;
  activeReplyTargetId: string | null;
  draftReplyContent: string;
  replyPlaceholder: string;
  replySubmitLabel: string;
  replyCancelLabel: string;
  onReplyOpen(comment: CommentNode): void;
  onReplyChange(content: string): void;
  onReplySubmit(comment: CommentNode): void;
  onReplyCancel(): void;
  onEdit?(comment: CommentNode): void;
  onDelete?(comment: CommentNode): void;
  onReport?(comment: CommentNode): void;
}): React.ReactElement {
  const isAuthor =
    typeof comment.isAuthor === "boolean"
      ? comment.isAuthor
      : Boolean(currentUserId && comment.author.id === currentUserId);

  const hasReplies = Boolean(comment.replies?.length);
  const replyCount = comment.replies?.length ?? 0;
  const hasHiddenReplies = replyCount > MAX_VISIBLE_REPLIES;
  const [isReplyExpanded, setIsReplyExpanded] = React.useState(false);
  const isReplyComposerOpen = activeReplyTargetId === comment.id;
  const visibleReplies =
    hasHiddenReplies && !isReplyExpanded
      ? comment.replies?.slice(0, MAX_VISIBLE_REPLIES)
      : comment.replies;

  return (
    <li>
      <article
        onClick={() => onReplyOpen(comment)}
        className={cn(
          "flex cursor-text gap-3 rounded-3 border px-3.5 py-3",
          depth === 0 ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50/70",
        )}
      >
        <CircleAvatar
          imageUrl={comment.author.profileImageUrl}
          size={depth > 0 ? "sm" : "md"}
          className="shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="relative pr-10">
            <div className="flex items-start gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <Text size="caption1" weight="bold" className="text-gray-900">
                  {comment.author.nickname}
                </Text>
                <Text size="caption2" weight="regular" className="text-gray-500">
                  {comment.createdAt}
                </Text>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <CommentActionsMenu
                comment={comment}
                isAuthor={isAuthor}
                onEdit={onEdit}
                onDelete={onDelete}
                onReport={onReport}
              />
            </div>
            <Text
              as="p"
              size="caption1"
              weight="regular"
              className="mt-0.5 leading-relaxed break-words whitespace-pre-wrap text-gray-800"
            >
              {comment.content}
            </Text>
          </div>
          {hasReplies ? (
            <ul className="mt-3 space-y-2.5">
              {visibleReplies?.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  currentUserId={currentUserId}
                  activeReplyTargetId={activeReplyTargetId}
                  draftReplyContent={draftReplyContent}
                  replyPlaceholder={replyPlaceholder}
                  replySubmitLabel={replySubmitLabel}
                  replyCancelLabel={replyCancelLabel}
                  onReplyOpen={onReplyOpen}
                  onReplyChange={onReplyChange}
                  onReplySubmit={onReplySubmit}
                  onReplyCancel={onReplyCancel}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReport={onReport}
                />
              ))}
            </ul>
          ) : null}
          <div
            aria-hidden={!isReplyComposerOpen}
            className={cn(
              "overflow-hidden transition-all duration-250 ease-out",
              isReplyComposerOpen
                ? "mt-2.5 max-h-[260px] opacity-100"
                : "mt-0 max-h-0 opacity-0 pointer-events-none",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="rounded-2 border border-gray-200 bg-white p-2.5">
              <textarea
                value={draftReplyContent}
                onChange={(event) => onReplyChange(event.target.value)}
                placeholder={replyPlaceholder}
                className={cn(
                  "min-h-[84px] w-full resize-y rounded-2 border border-gray-200 px-3 py-2 outline-none",
                  "text-sm leading-relaxed text-gray-900 placeholder:text-gray-400",
                  "focus-visible:ring-3 focus-visible:ring-main-300/60",
                )}
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="rounded-2 px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
                  onClick={onReplyCancel}
                >
                  <Text size="caption2" weight="medium">
                    {replyCancelLabel}
                  </Text>
                </button>
                <button
                  type="button"
                  className={cn(
                    "rounded-2 bg-main-800 px-2.5 py-1.5 text-white transition-colors hover:bg-main-700",
                    !draftReplyContent.trim() && "cursor-not-allowed bg-main-400 hover:bg-main-400",
                  )}
                  onClick={() => onReplySubmit(comment)}
                  disabled={!draftReplyContent.trim()}
                >
                  <Text size="caption2" weight="bold">
                    {replySubmitLabel}
                  </Text>
                </button>
              </div>
            </div>
          </div>
          {hasHiddenReplies ? (
            <button
              type="button"
              className="mt-2.5 inline-flex rounded-2 px-2 py-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
              onClick={() => setIsReplyExpanded((prev) => !prev)}
            >
              <Text size="caption2" weight="medium">
                {isReplyExpanded
                  ? "접기"
                  : `대댓글 더보기 (${replyCount - MAX_VISIBLE_REPLIES})`}
              </Text>
            </button>
          ) : null}
        </div>
      </article>
    </li>
  );
}

export function CommentThread({
  comments,
  currentUserId,
  className,
  replyPlaceholder = "댓글을 입력하세요.",
  replySubmitLabel = "등록",
  replyCancelLabel = "취소",
  onReplySubmit,
  onEdit,
  onDelete,
  onReport,
}: CommentThreadProps): React.ReactElement {
  const [activeReplyTargetId, setActiveReplyTargetId] = React.useState<string | null>(null);
  const [draftReplyContent, setDraftReplyContent] = React.useState("");

  const handleReplyOpen = (comment: CommentNode): void => {
    setActiveReplyTargetId(comment.id);
    setDraftReplyContent("");
  };

  const handleReplyCancel = (): void => {
    setActiveReplyTargetId(null);
    setDraftReplyContent("");
  };

  const handleReplySubmit = (comment: CommentNode): void => {
    const trimmedContent = draftReplyContent.trim();
    if (!trimmedContent) {
      return;
    }

    onReplySubmit?.(comment, trimmedContent);
    setDraftReplyContent("");
    setActiveReplyTargetId(null);
  };

  if (!comments.length) {
    return (
      <div className={cn("rounded-3 border border-gray-200 bg-white px-4 py-5", className)}>
        <Text size="caption1" weight="regular" className="text-gray-500">
          아직 댓글이 없습니다.
        </Text>
      </div>
    );
  }

  return (
    <ul className={cn("space-y-4", className)}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          depth={0}
          currentUserId={currentUserId}
          activeReplyTargetId={activeReplyTargetId}
          draftReplyContent={draftReplyContent}
          replyPlaceholder={replyPlaceholder}
          replySubmitLabel={replySubmitLabel}
          replyCancelLabel={replyCancelLabel}
          onReplyOpen={handleReplyOpen}
          onReplyChange={setDraftReplyContent}
          onReplySubmit={handleReplySubmit}
          onReplyCancel={handleReplyCancel}
          onEdit={onEdit}
          onDelete={onDelete}
          onReport={onReport}
        />
      ))}
    </ul>
  );
}
