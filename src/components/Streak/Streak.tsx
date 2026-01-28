"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../Tooltip";

export interface StreakData {
  /** 날짜 (YYYY-MM-DD) */
  date: string;
  /** 활동 레벨 (0-4) */
  count: number;
}

export interface StreakProps {
  /** 활동 데이터 (count 0-4 권장, 데이터 개수에 따라 가로로 길어짐) */
  data?: StreakData[];
  /** 각 날짜 박스의 크기 (픽셀) */
  size?: number;
  /** 추가 클래스 */
  className?: string;
}

/**
 * Streak
 * 활동 기록을 깃허브 잔디(Contribution Graph) 스타일로 보여주는 컴포넌트.
 * 7행 그리드 구조로 요일별로 쌓이며 가로로 데이터가 추가됩니다.
 */
export function Streak({
  data = [],
  size = 16,
  className,
}: StreakProps): React.ReactElement {
  const getLevelColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count <= 1) return "bg-main-200";
    if (count <= 3) return "bg-main-400";
    if (count <= 6) return "bg-main-600";
    return "bg-main-800";
  };

  return (
    <div className={cn("w-full overflow-x-auto pb-2", className)}>
      <TooltipProvider>
        <div 
          className="grid grid-flow-col grid-rows-7 gap-[2px]"
          style={{ 
            gridTemplateRows: `repeat(7, ${size}px)`,
          }}
        >
          {data.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "rounded-[2px] transition-colors duration-200 hover:ring-2 hover:ring-gray-400 hover:ring-offset-1 dark:hover:ring-gray-600",
                    getLevelColor(item.count)
                  )}
                  style={{
                    width: size,
                    height: size,
                  }}
                />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">
                  {item.count} contributions on {item.date}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
          {/* 데이터가 부족하더라도 최소 그리드 형태를 유지하고 싶다면 여기에 빈 셀 추가 로직 가능 */}
        </div>
      </TooltipProvider>
    </div>
  );
}
