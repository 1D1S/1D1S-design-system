"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Close } from "../Icons/Close";
import { Icon, type IconName } from "../Icons/Icon";
import { Text } from "../Text";
import { Button } from "../Button";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.ReactElement {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

const dialogContentVariants = cva(
  cn(
    "fixed top-[50%] left-[50%] z-50 flex flex-col",
    "w-[calc(100%-2rem)] max-w-[92vw] -translate-x-1/2 -translate-y-1/2",
    "rounded-4 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.18)]",
    "overflow-hidden",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "duration-200",
  ),
  {
    variants: {
      size: {
        sm: "sm:w-[360px]",
        md: "sm:w-[480px]",
        lg: "sm:w-[600px]",
        xl: "sm:w-[760px]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /** 닫기 버튼 노출 (기본 true) */
  showClose?: boolean;
}

function DialogContent({
  className,
  children,
  size,
  showClose = true,
  ...props
}: DialogContentProps): React.ReactElement {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className={cn(
              "absolute top-4 right-4 flex h-7 w-7 items-center justify-center",
              "rounded-2 bg-gray-100 text-gray-700 transition-colors",
              "hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
            )}
          >
            <Close width={14} height={14} />
            <span className="sr-only">닫기</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-[22px] pt-[18px] pb-3",
        className,
      )}
      {...props}
    />
  );
}

function DialogBody({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "px-[22px] pt-1 pb-[18px] text-gray-700",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex justify-end gap-2 border-t border-gray-100 bg-gray-50 px-[18px] py-[14px]",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>): React.ReactElement {
  return (
    <DialogPrimitive.Title asChild {...props}>
      <Text size="body2" weight="extrabold" className={cn("text-black tracking-[-0.3px]", className)}>
        {children}
      </Text>
    </DialogPrimitive.Title>
  );
}

function DialogDescription({
  className,
  children,
  ...props
}: React.ComponentProps<
  typeof DialogPrimitive.Description
>): React.ReactElement {
  return (
    <DialogPrimitive.Description asChild {...props}>
      <Text
        size="caption2"
        weight="regular"
        className={cn("text-gray-700 leading-[1.55]", className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Description>
  );
}

// ─── Confirm Dialog ──────────────────────────────────────────────────

const confirmToneStyles = {
  brand: { iconBg: "bg-main-200", iconColor: "text-brand", buttonVariant: "primary" as const },
  danger: { iconBg: "bg-red-300/40", iconColor: "text-red-600", buttonVariant: "danger" as const },
  mint: { iconBg: "bg-mint-200", iconColor: "text-mint-900", buttonVariant: "primary" as const },
};

export type ConfirmTone = keyof typeof confirmToneStyles;

export interface ConfirmDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 톤 색상 — `brand` (기본) · `danger` · `mint` */
  tone?: ConfirmTone;
  /** 상단 원형 배지에 들어갈 아이콘 */
  icon?: IconName;
  title: React.ReactNode;
  /** `\n` 줄바꿈을 그대로 렌더 */
  description?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Trigger 노드 (옵션). 외부에서 `open`을 제어할 때는 생략 */
  children?: React.ReactNode;
}

/**
 * ConfirmDialog
 * 아이콘 + 제목 + 설명 + 2버튼 형태의 확인 다이얼로그.
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   tone="danger"
 *   icon="Flame"
 *   title="정말 포기하시겠어요?"
 *   description={"27일 스트릭이 초기화돼요.\n이 동작은 되돌릴 수 없어요."}
 *   confirmLabel="포기"
 *   onConfirm={() => stop()}
 * >
 *   <Button variant="danger">포기하기</Button>
 * </ConfirmDialog>
 * ```
 */
function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  tone = "brand",
  icon = "Flag",
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps): React.ReactElement {
  const t = confirmToneStyles[tone];

  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[360px] max-w-[92vw] rounded-[18px] bg-white px-[22px] pt-6 pb-[18px] text-center",
            "shadow-[0_24px_64px_rgba(0,0,0,0.18)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "duration-200",
          )}
        >
          <div
            className={cn(
              "mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-full",
              t.iconBg,
            )}
          >
            <Icon name={icon} size={26} className={t.iconColor} />
          </div>
          <DialogPrimitive.Title asChild>
            <Text size="body2" weight="extrabold" className="block text-black tracking-[-0.3px]">
              {title}
            </Text>
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description asChild>
              <Text
                size="caption2"
                weight="regular"
                className="mt-1.5 block whitespace-pre-line text-gray-600 leading-[1.55]"
              >
                {description}
              </Text>
            </DialogPrimitive.Description>
          )}
          <div className="mt-[18px] flex gap-2">
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="h-11 flex-1 rounded-[10px]"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={t.buttonVariant}
                className="h-11 flex-1 rounded-[10px]"
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </DialogClose>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  ConfirmDialog,
};
