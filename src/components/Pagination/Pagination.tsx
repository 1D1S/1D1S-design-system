"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

export interface PaginationProps {
  /** 현재 페이지 (1부터 시작) */
  currentPage: number;
  /** 총 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 현재 페이지 양옆에 보여줄 페이지 개수 */
  siblingCount?: number;
  /** 추가 클래스 */
  className?: string;
}

const DOTS = "...";

function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
}) {
  const paginationRange = React.useMemo(() => {
    // 총 보여질 페이지 번호의 개수 (siblingCount + firstPage + lastPage + currentPage + 2*DOTS)
    const totalPageNumbers = siblingCount + 5;

    // 전체 페이지 수가 보여질 개수보다 작으면 그냥 다 보여줌
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: 오른쪽에만 점이 있는 경우
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }

    // Case 3: 왼쪽에만 점이 있는 경우
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: 양쪽에 점이 있는 경우
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, currentPage, siblingCount]);

  return paginationRange;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps): React.ReactElement | null {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  if (currentPage === 0 || totalPages < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-3", className)}
    >
      <Button
        onClick={onPrevious}
        disabled={currentPage === 1}
        variant="outlined"
        size="icon"
        className="rounded-4 border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={`dots-${index}`}
              className="flex h-10 min-w-10 items-center justify-center px-1"
            >
              <span className="text-xl font-medium text-gray-400">
                ...
              </span>
            </div>
          );
        }

        const isCurrent = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber as number)}
            variant={isCurrent ? "default" : "secondary"}
            size="icon"
            className={cn(
              "rounded-4",
              isCurrent
                ? "bg-main-800 text-white shadow-[0_8px_16px_rgba(255,87,34,0.3)] hover:bg-main-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            aria-current={isCurrent ? "page" : undefined}
          >
            <span
              className={cn(
                "text-[28px] leading-none",
                isCurrent ? "font-bold text-white" : "font-medium text-gray-700"
              )}
            >
              {pageNumber}
            </span>
          </Button>
        );
      })}

      <Button
        onClick={onNext}
        disabled={currentPage === totalPages}
        variant="outlined"
        size="icon"
        className="rounded-4 border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400"
        aria-label="Go to next page"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </nav>
  );
}
