"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { Toast, type ToastProps, type ToastTone } from "./Toast";
import type { IconName } from "../Icons/Icon";

export interface ToastOptions {
  tone?: ToastTone;
  icon?: IconName;
  title?: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
  onAction?: () => void;
  /** ms 단위 자동 닫힘. 0 또는 음수면 수동 닫기 (기본 4000) */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  show: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export type ToastPosition =
  | "top"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-right"
  | "bottom-left";

const positionClasses: Record<ToastPosition, string> = {
  top: "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  bottom: "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
};

export interface ToastProviderProps {
  children: React.ReactNode;
  /** 토스트 정렬 위치 (기본 `top-right`) */
  position?: ToastPosition;
  /** 동시에 표시되는 최대 토스트 수 (기본 5) */
  max?: number;
}

/**
 * ToastProvider
 * 앱 루트에 한 번 감싸 두면 어디서든 `useToast()`로 토스트를 띄울 수 있어요.
 *
 * @example
 * ```tsx
 * <ToastProvider position="top-right">
 *   <App />
 * </ToastProvider>
 * ```
 */
export function ToastProvider({
  children,
  position = "top-right",
  max = 5,
}: ToastProviderProps): React.ReactElement {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);
  const timersRef = React.useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = React.useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const show = React.useCallback(
    (options: ToastOptions) => {
      idRef.current += 1;
      const id = idRef.current;
      const duration = options.duration ?? 4000;

      setItems((prev) => {
        const next = [...prev, { ...options, id }];
        return next.length > max ? next.slice(next.length - max) : next;
      });

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [dismiss, max],
  );

  React.useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const value = React.useMemo(() => ({ show, dismiss }), [show, dismiss]);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              "pointer-events-none fixed z-[1000] flex max-w-[calc(100%-32px)] flex-col gap-2",
              positionClasses[position],
            )}
          >
            {items.map((it) => (
              <div
                key={it.id}
                className="pointer-events-auto animate-in fade-in-0 slide-in-from-top-2 duration-300"
              >
                <Toast
                  tone={it.tone}
                  icon={it.icon}
                  title={it.title}
                  body={it.body}
                  action={it.action}
                  onAction={() => {
                    it.onAction?.();
                    dismiss(it.id);
                  }}
                />
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

/** 토스트를 띄우거나 닫을 수 있는 훅. `<ToastProvider>` 하위에서만 사용 */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider />");
  }
  return ctx;
}

export type { ToastProps };
