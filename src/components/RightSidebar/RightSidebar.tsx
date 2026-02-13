"use client";

import React, { useState } from "react";
import { ChevronRight, PencilLine, Settings, User } from "lucide-react";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";
import { Button } from "../Button";
import { Text } from "../Text";

type ChallengeTone = "blue" | "green" | "orange";

export interface RightSidebarChallenge {
  id: string;
  title: string;
  progress: number;
  hasDeadline?: boolean;
  tone?: ChallengeTone;
}

export interface RightSidebarProps {
  userName: string;
  userHandle: string;
  userImage?: string;
  streakDays: number;
  fixed?: boolean;
  className?: string;
  diaryButtonLabel?: string;
  myPageButtonLabel?: string;
  settingButtonLabel?: string;
  challengeTitle?: string;
  challenges?: RightSidebarChallenge[];
  onCollapseClick?(): void;
  onOpenSettings?(): void;
  onWriteDiary?(): void;
  onGoMyPage?(): void;
}

const defaultChallenges: RightSidebarChallenge[] = [
  { id: "1", title: "알고리즘 부시기", progress: 56, tone: "blue" },
  { id: "2", title: "새벽 러닝", progress: 84, tone: "green" },
];

const toneClasses: Record<ChallengeTone, { progress: string }> = {
  blue: {
    progress: "bg-blue-500",
  },
  green: {
    progress: "bg-green-500",
  },
  orange: {
    progress: "bg-main-800",
  },
};

export function RightSidebar({
  userName,
  userHandle,
  userImage,
  streakDays,
  fixed = true,
  className,
  diaryButtonLabel = "일지 작성하기",
  myPageButtonLabel = "마이페이지",
  settingButtonLabel = "설정",
  challengeTitle = "참여중인 챌린지",
  challenges = defaultChallenges,
  onCollapseClick,
  onOpenSettings,
  onWriteDiary,
  onGoMyPage,
}: RightSidebarProps): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = (): void => {
    setIsCollapsed((prev) => !prev);
    onCollapseClick?.();
  };

  return (
    <div
      className={cn(
        "z-40 transition-[width] duration-300 ease-in-out",
        fixed
          ? "fixed top-4 right-3 max-h-[calc(100vh-2rem)]"
          : "relative max-h-[760px]",
        isCollapsed ? "w-22" : "w-69",
        className,
      )}
    >
      <Button
        type="button"
        variant="outlined"
        size="icon"
        aria-label="사이드바 접기"
        onClick={handleToggleCollapse}
        className="absolute top-6 -left-4 z-20 h-8 w-8 min-w-8 rounded-full p-0 text-gray-500 shadow-sm"
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isCollapsed ? "rotate-180" : "rotate-0",
          )}
        />
      </Button>

      <aside
        className={cn(
          "relative flex w-full flex-col overflow-x-hidden overflow-y-auto rounded-4 border border-gray-200 bg-white transition-[padding] duration-300 ease-in-out",
          fixed && "max-h-[calc(100vh-2rem)]",
          !fixed && "max-h-full",
          isCollapsed ? "p-3" : "p-4",
        )}
      >
        <div
          className={cn(
            "flex w-full flex-col transition-all duration-150 ease-in-out",
            isCollapsed
              ? "pointer-events-none absolute inset-0 translate-x-3 opacity-0 delay-0"
              : "pointer-events-auto relative translate-x-0 opacity-100 delay-150",
          )}
          aria-hidden={isCollapsed}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <CircleAvatar
                imageUrl={userImage}
                size="md"
                className="ring-2 ring-mint-900/40"
              />
              <div className="flex flex-col gap-1">
                <Text size="body1" weight="bold" className="text-gray-900">
                  {userName}
                </Text>
                <Text
                  size="caption1"
                  weight="regular"
                  className="text-gray-600"
                >
                  @{userHandle}
                </Text>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="설정"
              onClick={onOpenSettings}
              className="rounded-full text-gray-500 hover:text-gray-700"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 rounded-3 border border-main-400 bg-main-200 px-4 py-4 text-center">
            <Text size="caption1" weight="medium" className="text-gray-700">
              현재 연속 기록
            </Text>
            <div className="mt-2 flex items-end justify-center gap-2">
              <Text size="heading1" weight="bold" className="text-main-800">
                {streakDays}
              </Text>
              <Text size="body1" weight="bold" className="pb-1 text-gray-800">
                Days🔥
              </Text>
            </div>
          </div>

          <Button className="mt-5 w-full" size="medium" onClick={onWriteDiary}>
            <PencilLine className="h-4 w-4" />
            <Text size="body2" weight="bold" className="text-inherit">
              {diaryButtonLabel}
            </Text>
          </Button>

          <Button
            variant="outlined"
            className="mt-3 w-full"
            size="medium"
            onClick={onGoMyPage}
          >
            <User className="h-4 w-4" />
            <Text size="body2" weight="bold" className="text-inherit">
              {myPageButtonLabel}
            </Text>
          </Button>

          <div className="mt-auto border-t border-gray-200 pt-5">
            <Text size="caption1" weight="medium" className="text-gray-500">
              {challengeTitle}
            </Text>

            <div className="mt-4 flex flex-col gap-5">
              {challenges.map((challenge) => {
                const tone = challenge.tone ?? "blue";
                const hasDeadline = challenge.hasDeadline ?? true;
                const clampedProgress = Math.min(
                  Math.max(challenge.progress, 0),
                  100,
                );
                const progressLabel = hasDeadline ? `${clampedProgress}%` : "∞";
                const progressWidth = hasDeadline
                  ? `${clampedProgress}%`
                  : "100%";

                return (
                  <div key={challenge.id}>
                    <div className="flex items-center justify-between gap-3">
                      <Text
                        size="caption1"
                        weight="medium"
                        className="line-clamp-1 text-gray-800"
                      >
                        {challenge.title}
                      </Text>
                      <Text
                        size="caption1"
                        weight="medium"
                        className="shrink-0 text-gray-600"
                      >
                        {progressLabel}
                      </Text>
                    </div>

                    <div className="mt-2.5 h-1.5 rounded-full bg-gray-200">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-200",
                          toneClasses[tone].progress,
                        )}
                        style={{ width: progressWidth }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col items-center px-3 pt-3 transition-all duration-150 ease-in-out",
            isCollapsed
              ? "pointer-events-auto relative translate-x-0 opacity-100 delay-150"
              : "pointer-events-none absolute inset-0 -translate-x-3 opacity-0 delay-0",
          )}
          aria-hidden={!isCollapsed}
        >
          <CircleAvatar
            imageUrl={userImage}
            size="md"
            className="ring-2 ring-mint-900/40"
          />

          <div className="mt-5 flex flex-col items-center gap-3">
            <Button
              type="button"
              size="icon"
              aria-label={diaryButtonLabel}
              onClick={onWriteDiary}
            >
              <PencilLine className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outlined"
              size="icon"
              aria-label={myPageButtonLabel}
              onClick={onGoMyPage}
            >
              <User className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outlined"
              size="icon"
              aria-label={settingButtonLabel}
              onClick={onOpenSettings}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
