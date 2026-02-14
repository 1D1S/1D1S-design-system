"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";
import { Close } from "../Icons/Close";
import { Text } from "../Text";

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
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>): React.ReactElement {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-[50%] left-[50%] z-50",
          "w-full max-w-[calc(100%-2rem)] sm:max-w-md",
          "translate-x-[-50%] translate-y-[-50%]",
          "rounded-2 bg-white p-4 sm:p-6 shadow-default",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "[&_[data-slot=button].h-13]:!h-11",
          "[&_[data-slot=button].h-13]:!px-3.5",
          "[&_[data-slot=button].h-11]:!h-9",
          "[&_[data-slot=button]_.text-lg]:!text-base",
          "[&_[data-slot=button]_.text-base]:!text-sm",
          "duration-200",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full p-1.5 opacity-70 transition-opacity hover:opacity-100 focus:outline-none cursor-pointer">
          <Close width={18} height={18} className="text-gray-500 sm:w-5 sm:h-5" />
          <span className="sr-only">닫기</span>
        </DialogPrimitive.Close>
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
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
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
        "mt-4 sm:mt-6 flex flex-row justify-end gap-2",
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
      <Text
        size="heading2"
        weight="bold"
        className={cn("text-black", className)}
      >
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
        size="body2"
        weight="regular"
        className={cn("text-gray-600 mt-2", className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Description>
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
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
