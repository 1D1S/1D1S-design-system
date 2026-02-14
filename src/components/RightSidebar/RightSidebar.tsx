"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Flame, PencilLine, Settings, User } from "lucide-react";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";
import { Button } from "../Button";
import { Text } from "../Text";
import { ProgressBar } from "../ProgressBar";

type RightSidebarProgressTone = "blue" | "green" | "orange";

export interface RightSidebarChallenge {
  id: string;
  title: string;
  progress: number;
  hasDeadline?: boolean;
  tone?: RightSidebarProgressTone;
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

const toneColorMap: Record<RightSidebarProgressTone, string> = {
  blue: "#3b82f6",
  green: "#22c55e",
  orange: "#ff5722",
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
  const CONTENT_FADE_OUT_MS = 140;
  const CONTENT_FADE_IN_MS = 220;
  const WIDTH_TRANSITION_MS = 300;
  const HEIGHT_TRANSITION_MS = 280;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState<"expanded" | "collapsed">(
    "expanded",
  );
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [heightLock, setHeightLock] = useState<number | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const transitionTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTransitionTimers = (): void => {
    transitionTimersRef.current.forEach((timerId) => clearTimeout(timerId));
    transitionTimersRef.current = [];
  };

  const addTransitionTimer = (callback: () => void, delay: number): void => {
    const timerId = setTimeout(() => {
      callback();
      transitionTimersRef.current = transitionTimersRef.current.filter(
        (currentTimerId) => currentTimerId !== timerId,
      );
    }, delay);
    transitionTimersRef.current.push(timerId);
  };

  useEffect(() => {
    return () => {
      clearTransitionTimers();
    };
  }, []);

  const resolveTargetHeight = (): number | null => {
    const asideElement = asideRef.current;
    if (!asideElement) return null;
    return Math.max(Math.ceil(asideElement.scrollHeight), 0);
  };

  const measureIntrinsicHeight = (): number | null => {
    const asideElement = asideRef.current;
    if (!asideElement) return null;

    const previousInlineHeight = asideElement.style.height;
    asideElement.style.height = "auto";
    const measuredHeight = resolveTargetHeight();
    asideElement.style.height = previousInlineHeight;

    return measuredHeight;
  };

  const handleToggleCollapse = (): void => {
    if (isAnimating) return;

    const nextCollapsed = !isCollapsed;
    const currentHeight = asideRef.current?.offsetHeight;
    if (currentHeight && currentHeight > 0) {
      setHeightLock(currentHeight);
    }

    setIsAnimating(true);
    setIsPanelVisible(false);
    onCollapseClick?.();

    clearTransitionTimers();

    addTransitionTimer(() => {
      setIsCollapsed(nextCollapsed);
      setActivePanel(nextCollapsed ? "collapsed" : "expanded");
    }, CONTENT_FADE_OUT_MS);

    addTransitionTimer(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetHeight = measureIntrinsicHeight();
          if (targetHeight && targetHeight > 0) {
            setHeightLock(targetHeight);
          }
        });
      });
    }, CONTENT_FADE_OUT_MS + WIDTH_TRANSITION_MS);

    addTransitionTimer(() => {
      setIsPanelVisible(true);
    }, CONTENT_FADE_OUT_MS + WIDTH_TRANSITION_MS + HEIGHT_TRANSITION_MS);

    addTransitionTimer(() => {
      setHeightLock(null);
      setIsAnimating(false);
    }, CONTENT_FADE_OUT_MS + WIDTH_TRANSITION_MS + HEIGHT_TRANSITION_MS + CONTENT_FADE_IN_MS);
  };

  return (
    <div
      className={cn(
        "z-40 transition-[width] duration-300 ease-in-out",
        fixed
          ? "fixed top-4 right-3 max-h-[calc(100vh-2rem)]"
          : "relative max-h-190",
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
        disabled={isAnimating}
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
        ref={asideRef}
        className={cn(
          "relative flex w-full flex-col overflow-x-hidden overflow-y-auto rounded-4 border border-gray-200 bg-white p-3 shadow-[0_6px_16px_rgba(34,34,34,0.06)] transition-[height] duration-300 ease-in-out",
          fixed && "max-h-[calc(100vh-2rem)]",
          !fixed && "max-h-full",
        )}
        style={{
          height: heightLock ? `${heightLock}px` : undefined,
        }}
      >
        <div
          className={cn(
            "flex h-full w-full transition-opacity ease-out",
            isPanelVisible
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
          style={{
            transitionDuration: `${isPanelVisible ? CONTENT_FADE_IN_MS : CONTENT_FADE_OUT_MS}ms`,
          }}
          aria-hidden={!isPanelVisible}
        >
          {activePanel === "expanded" ? (
            <div className="flex w-full flex-col px-2 py-2">
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
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-6 rounded-3 border border-main-400 bg-main-200 px-4 py-4 text-center">
                <Text size="caption1" weight="medium" className="text-gray-700">
                  현재 연속 기록
                </Text>
                <div className="mt-3 flex items-center justify-center gap-2.5">
                  <Flame className="h-7 w-7 text-main-800" strokeWidth={2.2} />
                  <Text size="heading1" weight="bold" className="text-main-800">
                    {streakDays}
                  </Text>
                  <Text size="body1" weight="bold" className="text-gray-800">
                    Days
                  </Text>
                </div>
              </div>

              <Button
                className="mt-5 w-full"
                size="medium"
                onClick={onWriteDiary}
              >
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

              <div className="mt-5 pt-5">
                <Text size="caption1" weight="medium" className="text-gray-500">
                  {challengeTitle}
                </Text>

                <div className="mt-4 flex flex-col gap-5">
                  {challenges.map((challenge) => {
                    const tone = challenge.tone ?? "blue";
                    return (
                      <ProgressBar
                        key={challenge.id}
                        label={challenge.title}
                        value={challenge.progress}
                        infinite={challenge.hasDeadline === false}
                        fillColor={toneColorMap[tone]}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center pt-2">
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
          )}
        </div>
      </aside>
    </div>
  );
}
