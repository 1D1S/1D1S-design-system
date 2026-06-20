"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { Snackbar } from "./Snackbar";

export interface SnackbarOptions {
  text: React.ReactNode;
  action?: React.ReactNode;
  onAction?: () => void;
  /** ms 단위 자동 닫힘. 0 또는 음수면 수동 닫기 (기본 3000) */
  duration?: number;
}

interface SnackbarItem extends SnackbarOptions {
  id: number;
}

interface SnackbarContextValue {
  show: (options: SnackbarOptions) => number;
  dismiss: (id: number) => void;
}

const SnackbarContext = React.createContext<SnackbarContextValue | null>(null);

export type SnackbarPosition = "top" | "bottom";

const positionClasses: Record<SnackbarPosition, string> = {
  top: "top-4",
  bottom: "bottom-4",
};

export interface SnackbarProviderProps {
  children: React.ReactNode;
  /** 위치 (기본 `bottom`) */
  position?: SnackbarPosition;
}

/**
 * SnackbarProvider
 * 앱 루트에 한 번 감싸 두면 어디서든 `useSnackbar()`로 스낵바를 띄울 수 있어요.
 *
 * @example
 * ```tsx
 * <SnackbarProvider>
 *   <App />
 * </SnackbarProvider>
 * ```
 */
export function SnackbarProvider({
  children,
  position = "bottom",
}: SnackbarProviderProps): React.ReactElement {
  const [item, setItem] = React.useState<SnackbarItem | null>(null);
  const [leaving, setLeaving] = React.useState(false);
  const idRef = React.useRef(0);
  const currentIdRef = React.useRef(0);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // exit 애니메이션 길이(ms) — 아래 exitCls의 duration과 맞춤
  const EXIT_MS = 220;

  // 즉시 제거가 아니라 exit 애니메이션 후 unmount
  const beginExit = React.useCallback((id: number) => {
    if (currentIdRef.current !== id) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (exitRef.current) return; // 이미 퇴장 중
    setLeaving(true);
    exitRef.current = setTimeout(() => {
      setItem(null);
      setLeaving(false);
      exitRef.current = null;
    }, EXIT_MS);
  }, []);

  const dismiss = React.useCallback((id: number) => beginExit(id), [beginExit]);

  const show = React.useCallback(
    (options: SnackbarOptions) => {
      idRef.current += 1;
      const id = idRef.current;
      currentIdRef.current = id;
      const duration = options.duration ?? 3000;

      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitRef.current) {
        clearTimeout(exitRef.current);
        exitRef.current = null;
      }
      setLeaving(false);
      setItem({ ...options, id });

      if (duration > 0) {
        timerRef.current = setTimeout(() => beginExit(id), duration);
      }
      return id;
    },
    [beginExit],
  );

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitRef.current) clearTimeout(exitRef.current);
    };
  }, []);

  // 위치에 맞춰 진입/퇴장 방향 결정 (full literal — Tailwind JIT 감지용)
  const isBottom = position === "bottom";
  const enterCls = isBottom
    ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
    : "animate-in fade-in-0 slide-in-from-top-2 duration-300";
  const exitCls = isBottom
    ? "animate-out fade-out-0 slide-out-to-bottom-2 duration-200"
    : "animate-out fade-out-0 slide-out-to-top-2 duration-200";

  const value = React.useMemo(() => ({ show, dismiss }), [show, dismiss]);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div
            className={cn(
              "pointer-events-none fixed left-1/2 z-[1000] flex -translate-x-1/2",
              positionClasses[position],
            )}
          >
            {item && (
              <div
                key={item.id}
                className={cn(
                  "pointer-events-auto",
                  leaving ? exitCls : enterCls,
                )}
              >
                <Snackbar
                  text={item.text}
                  action={item.action}
                  onAction={() => {
                    item.onAction?.();
                    dismiss(item.id);
                  }}
                />
              </div>
            )}
          </div>,
          document.body,
        )}
    </SnackbarContext.Provider>
  );
}

/** 스낵바를 띄우거나 닫을 수 있는 훅. `<SnackbarProvider>` 하위에서만 사용 */
export function useSnackbar(): SnackbarContextValue {
  const ctx = React.useContext(SnackbarContext);
  if (!ctx) {
    throw new Error("useSnackbar must be used within <SnackbarProvider />");
  }
  return ctx;
}
