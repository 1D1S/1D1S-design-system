"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";
import { Button } from "../Button";
import {
  ChevronRight,
  Flame,
  LogIn,
  PencilLine,
  Person,
  Settings,
} from "../Icons";
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
  isLoggedIn?: boolean;
  isLoading?: boolean;
  userName?: string;
  userSubtitle?: string;
  userImage?: string;
  streakDays: number;
  fixed?: boolean;
  className?: string;
  diaryButtonLabel?: string;
  myPageButtonLabel?: string;
  loginButtonLabel?: string;
  loginPromptMessage?: string;
  settingButtonLabel?: string;
  challengeTitle?: string;
  challenges?: RightSidebarChallenge[];
  emptyChallengeMessage?: string;
  joinChallengeButtonLabel?: string;
  joinChallengeMaxUserCount?: number;
  createChallengeButtonLabel?: string;
  collapsible?: boolean;
  onCollapseClick?(): void;
  onOpenSettings?(): void;
  onWriteDiary?(): void;
  onGoMyPage?(): void;
  onLogin?(): void;
  onJoinChallenge?(): void;
  onCreateChallenge?(): void;
  onChallengeClick?(challenge: RightSidebarChallenge): void;
}

function AnimatedNumber({ value }: { value: number }): React.ReactElement {
  const targetValue = Math.max(0, Math.floor(value));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const startTime = performance.now();
    const durationMs = Math.min(1400, Math.max(500, targetValue * 30));
    const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

    setDisplayValue(0);

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const nextValue = Math.floor(targetValue * easeOutCubic(progress));
      setDisplayValue(nextValue);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [targetValue]);

  const digitWidth = Math.max(String(targetValue).length, 1);

  return (
    <span
      className="inline-flex justify-start tabular-nums"
      style={{ minWidth: `${digitWidth}ch` }}
    >
      {displayValue}
    </span>
  );
}

function SidebarSkeleton({ className }: { className?: string }): React.ReactElement {
  return (
    <span
      aria-hidden
      className={cn("block animate-pulse rounded-md bg-gray-200", className)}
    />
  );
}

function SidebarCircleSkeleton({ className }: { className?: string }): React.ReactElement {
  return (
    <span
      aria-hidden
      className={cn("block h-12 w-12 shrink-0 animate-pulse bg-gray-200", className)}
      style={{ borderRadius: "9999px" }}
    />
  );
}

interface LoadingTransitionProps {
  loading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  durationMs?: number;
}

function LoadingTransition({
  loading,
  skeleton,
  children,
  className,
  durationMs = 280,
}: LoadingTransitionProps): React.ReactElement {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "transition-opacity ease-out",
          loading ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        style={{ transitionDuration: `${durationMs}ms` }}
        aria-hidden={loading}
      >
        {children}
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity ease-out",
          loading ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionDuration: `${durationMs}ms` }}
        aria-hidden={!loading}
      >
        {skeleton}
      </div>
    </div>
  );
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
  isLoggedIn = true,
  isLoading = false,
  userName,
  userSubtitle,
  userImage,
  streakDays,
  fixed = true,
  collapsible = true,
  className,
  diaryButtonLabel = "일지 작성하기",
  myPageButtonLabel = "마이페이지",
  loginButtonLabel = "로그인",
  loginPromptMessage = "로그인하고 연속 기록을 시작해보세요",
  settingButtonLabel = "설정",
  challengeTitle = "참여중인 챌린지",
  challenges = defaultChallenges,
  emptyChallengeMessage = "챌린지가 없어요.",
  joinChallengeButtonLabel = "챌린지 참여하기",
  joinChallengeMaxUserCount,
  createChallengeButtonLabel = "챌린지 생성하기",
  onCollapseClick,
  onOpenSettings,
  onWriteDiary,
  onGoMyPage,
  onLogin,
  onJoinChallenge,
  onCreateChallenge,
  onChallengeClick,
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
  const isJoinChallengeDisabled =
    typeof joinChallengeMaxUserCount === "number" &&
    joinChallengeMaxUserCount <= 0;

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
      {collapsible && (
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
      )}

      <aside
        ref={asideRef}
        className={cn(
          "relative flex w-full flex-col overflow-x-hidden overflow-y-auto rounded-4 border border-gray-200 bg-white p-3 shadow-[0_6px_16px_rgba(34,34,34,0.06)]",
          heightLock !== null && "transition-[height] duration-300 ease-in-out",
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
                <LoadingTransition
                  loading={isLoading}
                  skeleton={(
                    <div className="flex items-center gap-3">
                      <SidebarCircleSkeleton />
                      <div className="flex flex-col gap-1">
                        <SidebarSkeleton className="h-6 w-24 rounded-sm" />
                        <SidebarSkeleton className="h-4 w-28 rounded-sm" />
                      </div>
                    </div>
                  )}
                >
                  <div className="flex items-center gap-3">
                    <CircleAvatar
                      imageUrl={userImage}
                      size="md"
                      className="ring-2 ring-mint-900/40"
                    />
                    <div className="flex flex-col gap-1">
                      <Text size="body1" weight="bold" className="text-gray-900">
                        {isLoggedIn ? userName ?? "고라니" : "게스트"}
                      </Text>
                      <Text
                        size="caption1"
                        weight="regular"
                        className="text-gray-600"
                      >
                        {isLoggedIn
                          ? (userSubtitle ?? "")
                          : "로그인 후 이용 가능"}
                      </Text>
                    </div>
                  </div>
                </LoadingTransition>

                <LoadingTransition
                  loading={isLoading}
                  skeleton={<SidebarSkeleton className="h-9 w-9 rounded-full" />}
                >
                  {isLoggedIn ? (
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
                  ) : null}
                </LoadingTransition>
              </div>

              <div className="mt-6 rounded-3 border border-main-400 bg-main-200 px-4 py-4 text-center">
                <LoadingTransition
                  loading={isLoading}
                  skeleton={(
                    <div>
                      <SidebarSkeleton className="mx-auto h-4 w-20 rounded-sm" />
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <SidebarCircleSkeleton className="h-7 w-7" />
                        <SidebarSkeleton className="h-9 w-16 rounded-sm" />
                        <SidebarSkeleton className="h-5 w-12 rounded-sm" />
                      </div>
                    </div>
                  )}
                >
                  <div>
                    <Text
                      as="p"
                      size="caption1"
                      weight="medium"
                      className="text-gray-700"
                    >
                      현재 연속 기록
                    </Text>
                    {isLoggedIn ? (
                      <div className="mt-3 flex items-center justify-center gap-2.5">
                        <Flame
                          className="h-7 w-7 text-main-800"
                          strokeWidth={2.2}
                        />
                        <Text
                          size="heading1"
                          weight="bold"
                          className="text-main-800"
                        >
                          <AnimatedNumber value={streakDays} />
                        </Text>
                        <Text size="body1" weight="bold" className="text-gray-800">
                          Days
                        </Text>
                      </div>
                    ) : (
                      <Text
                        as="p"
                        size="caption1"
                        weight="medium"
                        className="mt-3 block leading-tight text-gray-700"
                      >
                        {loginPromptMessage}
                      </Text>
                    )}
                  </div>
                </LoadingTransition>
              </div>

              <LoadingTransition
                loading={isLoading}
                skeleton={(
                  <div>
                    <SidebarSkeleton className="mt-5 h-10 w-full rounded-2" />
                    <SidebarSkeleton className="mt-3 h-10 w-full rounded-2" />

                    <div className="mt-5 pt-5">
                      <SidebarSkeleton className="h-4 w-30 rounded-sm" />
                      <div className="mt-4 flex flex-col gap-3">
                        {Array.from({ length: 2 }, (_, index) => (
                          <div key={index} className="rounded-2 border border-gray-100 px-3 py-3">
                            <SidebarSkeleton className="h-4 w-32 rounded-sm" />
                            <SidebarSkeleton className="mt-3 h-2 w-full rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              >
                {isLoggedIn ? (
                  <>
                  <Button
                    className="mt-5 w-full"
                    size="medium"
                    disabled={challenges.length === 0}
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
                    <Person className="h-4 w-4" />
                    <Text size="body2" weight="bold" className="text-inherit">
                      {myPageButtonLabel}
                    </Text>
                  </Button>

                  <div className="mt-5 pt-5">
                    <Text
                      size="caption1"
                      weight="medium"
                      className="text-gray-500"
                    >
                      {challengeTitle}
                    </Text>

                    {challenges.length > 0 ? (
                      <div className="mt-4 flex flex-col gap-1">
                        {challenges.map((challenge) => {
                          const tone = challenge.tone ?? "blue";
                          return (
                            <div
                              key={challenge.id}
                              role={onChallengeClick ? "button" : undefined}
                              tabIndex={onChallengeClick ? 0 : undefined}
                              onClick={onChallengeClick ? () => onChallengeClick(challenge) : undefined}
                              onKeyDown={onChallengeClick ? (e) => { if (e.key === "Enter" || e.key === " ") onChallengeClick(challenge); } : undefined}
                              className={cn(
                                "-mx-2 rounded-2 px-2 py-2 transition-colors duration-150",
                                onChallengeClick && "cursor-pointer hover:bg-gray-100 active:bg-gray-200",
                              )}
                            >
                              <ProgressBar
                                label={challenge.title}
                                value={challenge.progress}
                                infinite={challenge.hasDeadline === false}
                                fillColor={toneColorMap[tone]}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-4">
                        <Text
                          as="p"
                          size="caption1"
                          weight="medium"
                          className="text-gray-600"
                        >
                          {emptyChallengeMessage}
                        </Text>

                        <div className="mt-3 flex flex-col gap-2.5">
                          <Button
                            type="button"
                            className="w-full"
                            size="medium"
                            disabled={isJoinChallengeDisabled}
                            onClick={onJoinChallenge}
                          >
                            {joinChallengeButtonLabel}
                          </Button>
                          <Button
                            type="button"
                            variant="outlined"
                            className="w-full"
                            size="medium"
                            onClick={onCreateChallenge}
                          >
                            {createChallengeButtonLabel}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
                ) : (
                  <Button className="mt-5 w-full" size="medium" onClick={onLogin}>
                    <LogIn className="h-4 w-4" />
                    <Text size="body2" weight="bold" className="text-inherit">
                      {loginButtonLabel}
                    </Text>
                  </Button>
                )}
              </LoadingTransition>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center pt-2">
              <LoadingTransition
                loading={isLoading}
                className="w-full"
                skeleton={(
                  <div className="flex w-full flex-col items-center">
                    <SidebarCircleSkeleton />
                    <div className="mt-5 flex flex-col items-center gap-3">
                      <SidebarCircleSkeleton className="h-10 w-10" />
                      <SidebarCircleSkeleton className="h-10 w-10" />
                      <SidebarCircleSkeleton className="h-10 w-10" />
                    </div>
                  </div>
                )}
              >
                <div className="flex w-full flex-col items-center">
                  <CircleAvatar
                    imageUrl={userImage}
                    size="md"
                    className="ring-2 ring-mint-900/40"
                  />

                  <div className="mt-5 flex flex-col items-center gap-3">
                    {isLoggedIn ? (
                      <>
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
                          <Person className="h-4 w-4" />
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
                      </>
                    ) : (
                      <Button
                        type="button"
                        size="icon"
                        aria-label={loginButtonLabel}
                        onClick={onLogin}
                      >
                        <LogIn className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </LoadingTransition>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
