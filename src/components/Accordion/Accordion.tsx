"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/utils";
import { ChevronDown } from "../Icons/ChevronDown";

/**
 * Accordion
 * 아코디언 컴포넌트 - 접을 수 있는 콘텐츠 섹션을 제공합니다.
 *
 * @example 단일 아코디언
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>제목</AccordionTrigger>
 *     <AccordionContent>내용</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * @example 다중 아코디언
 * ```tsx
 * <Accordion type="multiple">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>제목 1</AccordionTrigger>
 *     <AccordionContent>내용 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>제목 2</AccordionTrigger>
 *     <AccordionContent>내용 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion = AccordionPrimitive.Root;

/**
 * AccordionItem
 * 각 아코디언 항목을 감싸는 컨테이너
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>): React.ReactElement {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "border-b border-gray-200 last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

/**
 * AccordionTrigger
 * 아코디언을 열고 닫는 트리거 버튼
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>): React.ReactElement {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-3 sm:py-4 text-left",
          "text-sm sm:text-base font-medium text-gray-900 transition-colors",
          "hover:text-main-900",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-main-500 focus-visible:ring-offset-2 rounded-1",
          "[&[data-state=open]>svg]:rotate-180",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-gray-500 transition-transform duration-200"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * AccordionContent
 * 아코디언의 접히는 콘텐츠 영역
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>): React.ReactElement {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-gray-700",
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down"
      )}
      {...props}
    >
      <div className={cn("pb-3 sm:pb-4 pt-0 text-sm sm:text-base", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
