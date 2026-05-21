"use client";

import * as Popover from "@radix-ui/react-popover";
import React from "react";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";
import { Text } from "../Text";
import { TextArea } from "../TextField";

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
  hasMoreReplies?: boolean;
  remainingReplyCount?: number;
  isLoadingReplies?: boolean;
}

export interface CommentThreadProps {
  comments: CommentNode[];
  currentUserId?: string;
  className?: string;
  replyPlaceholder?: string;
  replySubmitLabel?: string;
  replyCancelLabel?: string;
  replyButtonLabel?: string;
  loadMoreRepliesLabel?: string;
  onDelete?(comment: CommentNode): void;
  onReport?(comment: CommentNode): void;
  onReplySubmit?(comment: CommentNode, content: string): void;
  onLoadMoreReplies?(comment: CommentNode): void;
}

interface CommentActionsMenuProps {
  comment: CommentNode;
  isAuthor: boolean;
  onDelete?(comment: CommentNode): void;
  onReport?(comment: CommentNode): void;
}

function CommentActionsMenu({
  comment,
  isAuthor,
  onDelete,
  onReport,
}: CommentActionsMenuProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const actionItems = isAuthor
    ? [
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
            "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
            "text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700",
          )}
        >
          <span className="sr-only">더보기</span>
          <span className="flex items-center gap-0.5">
            <span className="h-[3px] w-[3px] rounded-full bg-current" />
            <span className="h-[3px] w-[3px] rounded-full bg-current" />
            <span className="h-[3px] w-[3px] rounded-full bg-current" />
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
  isLast,
  currentUserId,
  activeReplyTargetId,
  draftReplyContent,
  replyPlaceholder,
  replySubmitLabel,
  replyCancelLabel,
  replyButtonLabel,
  loadMoreRepliesLabel,
  onReplyOpen,
  onReplyChange,
  onReplySubmit,
  onReplyCancel,
  onLoadMoreReplies,
  onDelete,
  onReport,
}: {
  comment: CommentNode;
  depth: number;
  isLast: boolean;
  currentUserId?: string;
  activeReplyTargetId: string | null;
  draftReplyContent: string;
  replyPlaceholder: string;
  replySubmitLabel: string;
  replyCancelLabel: string;
  replyButtonLabel: string;
  loadMoreRepliesLabel: string;
  onReplyOpen(comment: CommentNode): void;
  onReplyChange(content: string): void;
  onReplySubmit(comment: CommentNode): void;
  onReplyCancel(): void;
  onLoadMoreReplies?(comment: CommentNode): void;
  onDelete?(comment: CommentNode): void;
  onReport?(comment: CommentNode): void;
}): React.ReactElement {
  const isAuthor =
    typeof comment.isAuthor === "boolean"
      ? comment.isAuthor
      : Boolean(currentUserId && comment.author.id === currentUserId);

  const hasReplies = Boolean(comment.replies?.length);
  const isReplyComposerOpen = activeReplyTargetId === comment.id;
  const hasMoreReplies = Boolean(comment.hasMoreReplies);
  const replies = comment.replies ?? [];
  const showReplyButton = depth === 0 ? !hasReplies : isLast;

  return (
    <li>
      <div
        className={cn(
          "flex items-start gap-2.5 py-3",
          !isLast && depth === 0 && "border-b border-gray-100",
        )}
      >
        <CircleAvatar
          imageUrl={comment.author.profileImageUrl}
          size="sm"
          className="shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <Text
              size="caption1"
              weight="bold"
              className="truncate text-gray-900"
            >
              {comment.author.nickname}
            </Text>
            <div className="flex shrink-0 items-center gap-1">
              <Text
                size="caption2"
                weight="regular"
                className="text-gray-500"
              >
                {comment.createdAt}
              </Text>
              <CommentActionsMenu
                comment={comment}
                isAuthor={isAuthor}
                onDelete={onDelete}
                onReport={onReport}
              />
            </div>
          </div>
          <Text
            as="p"
            size="caption1"
            weight="regular"
            className="mt-1 leading-[1.5] break-words whitespace-pre-wrap text-gray-700"
          >
            {comment.content}
          </Text>

          {hasReplies ? (
            <ul className="mt-2 -ml-5 space-y-0 border-l border-gray-100 pl-3">
              {replies.map((reply, replyIndex) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  isLast={replyIndex === replies.length - 1}
                  currentUserId={currentUserId}
                  activeReplyTargetId={activeReplyTargetId}
                  draftReplyContent={draftReplyContent}
                  replyPlaceholder={replyPlaceholder}
                  replySubmitLabel={replySubmitLabel}
                  replyCancelLabel={replyCancelLabel}
                  replyButtonLabel={replyButtonLabel}
                  loadMoreRepliesLabel={loadMoreRepliesLabel}
                  onReplyOpen={onReplyOpen}
                  onReplyChange={onReplyChange}
                  onReplySubmit={onReplySubmit}
                  onReplyCancel={onReplyCancel}
                  onLoadMoreReplies={onLoadMoreReplies}
                  onDelete={onDelete}
                  onReport={onReport}
                />
              ))}
            </ul>
          ) : null}

          <div
            aria-hidden={!isReplyComposerOpen}
            className={cn(
              "overflow-hidden transition-all duration-200 ease-out",
              isReplyComposerOpen
                ? "mt-1 max-h-[260px] opacity-100"
                : "mt-0 max-h-0 opacity-0 pointer-events-none",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-1.5 p-1">
              <TextArea
                value={draftReplyContent}
                onChange={(event) => onReplyChange(event.target.value)}
                placeholder={replyPlaceholder}
                rows={1}
                className="min-h-[36px] flex-1 text-[12px]"
              />
              <button
                type="button"
                className="rounded-2 px-2 py-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
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
                  !draftReplyContent.trim() &&
                    "cursor-not-allowed bg-main-400 hover:bg-main-400",
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

          {(showReplyButton && !isReplyComposerOpen) || hasMoreReplies ? (
            <div className="mt-1.5 flex items-center gap-1">
              {showReplyButton && !isReplyComposerOpen ? (
                <button
                  type="button"
                  className="inline-flex rounded-2 px-1.5 py-0.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => onReplyOpen(comment)}
                >
                  <Text size="caption2" weight="medium">
                    {replyButtonLabel}
                  </Text>
                </button>
              ) : null}
              {hasMoreReplies ? (
                <button
                  type="button"
                  className="inline-flex rounded-2 px-1.5 py-0.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => onLoadMoreReplies?.(comment)}
                  disabled={comment.isLoadingReplies}
                >
                  <Text size="caption2" weight="medium">
                    {comment.isLoadingReplies
                      ? "불러오는 중..."
                      : `${loadMoreRepliesLabel}${
                          typeof comment.remainingReplyCount === "number"
                            ? ` (${comment.remainingReplyCount})`
                            : ""
                        }`}
                  </Text>
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
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
  replyButtonLabel = "답글 달기",
  loadMoreRepliesLabel = "대댓글 더보기",
  onReplySubmit,
  onLoadMoreReplies,
  onDelete,
  onReport,
}: CommentThreadProps): React.ReactElement {
  const [activeReplyTargetId, setActiveReplyTargetId] = React.useState<
    string | null
  >(null);
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
      <Text
        size="caption1"
        weight="regular"
        className={cn("block py-2 text-gray-500", className)}
      >
        아직 댓글이 없습니다.
      </Text>
    );
  }

  return (
    <ul className={cn("flex flex-col", className)}>
      {comments.map((comment, index) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          depth={0}
          isLast={index === comments.length - 1}
          currentUserId={currentUserId}
          activeReplyTargetId={activeReplyTargetId}
          draftReplyContent={draftReplyContent}
          replyPlaceholder={replyPlaceholder}
          replySubmitLabel={replySubmitLabel}
          replyCancelLabel={replyCancelLabel}
          replyButtonLabel={replyButtonLabel}
          loadMoreRepliesLabel={loadMoreRepliesLabel}
          onReplyOpen={handleReplyOpen}
          onReplyChange={setDraftReplyContent}
          onReplySubmit={handleReplySubmit}
          onReplyCancel={handleReplyCancel}
          onLoadMoreReplies={onLoadMoreReplies}
          onDelete={onDelete}
          onReport={onReport}
        />
      ))}
    </ul>
  );
}
