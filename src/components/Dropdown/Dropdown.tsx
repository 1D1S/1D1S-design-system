"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Text } from "../Text";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

/**
 * SelectTrigger
 * Select 기본 트리거 컴포넌트
 *
 * @example
 * ```tsx
 * <SelectTrigger className="w-[180px]">
 *   <SelectValue placeholder="값을 선택해주세요" />
 * </SelectTrigger>
 * ```
 */
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}): React.ReactElement {
  const isSmall = size === "sm";

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "group flex w-full items-center justify-between whitespace-nowrap border-2 bg-white outline-none transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[placeholder]:text-gray-500 focus-visible:ring-3 focus-visible:ring-main-300/60",
        isSmall
          ? "h-[52px] min-w-[200px] rounded-3 border-gray-300 px-4"
          : "h-[136px] min-w-[560px] rounded-[32px] border-gray-300 px-14 shadow-[0_8px_16px_rgba(34,34,34,0.08)]",
        className,
      )}
      {...props}
    >
      <Text size={isSmall ? "body2" : "display2"} weight="medium" className="line-clamp-1 text-gray-900">
        {children}
      </Text>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          data-slot="select-chevron"
          className={cn(
            "pointer-events-none shrink-0 text-gray-600 transition-transform duration-200 group-data-[state=open]:rotate-180",
            isSmall ? "h-5 w-5" : "h-10 w-10"
          )}
          strokeWidth={2.8}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/**
 * SelectItem
 * Select 기본 아이템 컴포넌트
 *
 * @example
 * ```tsx
 * <SelectItem value="option1">value1</SelectItem>
 * ```
 */
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>): React.ReactElement {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-3 rounded-2 px-4 py-3 outline-hidden select-none",
        "text-gray-900 transition-colors focus:bg-gray-100 focus:text-gray-900",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute right-3 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-main-800" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>
        <Text size="body1" weight="medium">
          {children}
        </Text>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * SelectSeparator
 * Select 구분선 컴포넌트
 */
function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>): React.ReactElement {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none my-1 h-px bg-gray-200",
        className,
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
>): React.ReactElement {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-gray-600",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.ScrollDownButton
>): React.ReactElement {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-gray-600",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

/**
 * SelectContent
 * Select 기본 컨텐츠 컴포넌트
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectGroup>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *   </SelectGroup>
 * </SelectContent>
 * ```
 */
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>): React.ReactElement {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          "rounded-[24px] border-2 border-gray-300 bg-white shadow-[0_10px_20px_rgba(34,34,34,0.1)]",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-2",
            position === "popper" &&
              "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>): React.ReactElement {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-4 py-2 text-xs font-bold text-gray-500", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
