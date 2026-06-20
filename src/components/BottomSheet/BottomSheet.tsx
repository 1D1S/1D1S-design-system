"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";
import { Text } from "../Text";
import { Close as CloseIcon } from "../Icons";

const BottomSheet = DialogPrimitive.Root;
const BottomSheetTrigger = DialogPrimitive.Trigger;
const BottomSheetPortal = DialogPrimitive.Portal;
const BottomSheetClose = DialogPrimitive.Close;

function BottomSheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.ReactElement {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/45",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

export interface BottomSheetContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  /** 시트 좌·우·하단 inset (px). 기본 8 */
  inset?: number;
  /** 상단 그립 핸들 노출 (기본 true) */
  showHandle?: boolean;
  /** 우측 상단 닫기 버튼 노출 (기본 false) */
  showClose?: boolean;
}

function BottomSheetContent({
  className,
  children,
  inset = 8,
  showHandle = true,
  showClose = false,
  style,
  ...props
}: BottomSheetContentProps): React.ReactElement {
  return (
    <BottomSheetPortal>
      <BottomSheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 bg-white",
          "rounded-4 shadow-up",
          "px-5 pt-2.5 pb-4",
          "max-h-[85dvh] overflow-y-auto",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "duration-300",
          className,
        )}
        style={{
          left: inset,
          right: inset,
          bottom: inset,
          ...style,
        }}
        {...props}
      >
        {showHandle && (
          <div
            aria-hidden="true"
            className="mx-auto mt-1 mb-3 h-1 w-9 rounded-full bg-gray-300"
          />
        )}
        {showClose && (
          <BottomSheetClose
            aria-label="닫기"
            className={cn(
              "absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full",
              "text-gray-500 transition-colors duration-200",
              "hover:bg-gray-100 hover:text-gray-900",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
            )}
          >
            <CloseIcon className="size-5" />
          </BottomSheetClose>
        )}
        {children}
      </DialogPrimitive.Content>
    </BottomSheetPortal>
  );
}

function BottomSheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div className={cn("mb-2.5", className)} {...props} />;
}

function BottomSheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("mt-1.5 flex gap-2", className)}
      {...props}
    />
  );
}

function BottomSheetTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>): React.ReactElement {
  return (
    <DialogPrimitive.Title asChild {...props}>
      <Text
        size="body2"
        weight="extrabold"
        className={cn("block text-black tracking-[-0.3px]", className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Title>
  );
}

function BottomSheetDescription({
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
        className={cn("text-gray-600 mt-1", className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Description>
  );
}

export {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetPortal,
  BottomSheetClose,
  BottomSheetOverlay,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
};
