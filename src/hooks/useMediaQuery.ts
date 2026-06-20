"use client";

import * as React from "react";

/**
 * useMediaQuery
 * 주어진 미디어쿼리의 매칭 여부를 SSR 안전하게 반환한다.
 * 서버 렌더링 시점에는 항상 false를 반환하고, 마운트 이후 실제 값으로 동기화한다.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined" || !window.matchMedia) {
        return () => {};
      }
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = React.useCallback(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = React.useCallback(() => false, []);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** 모바일 뷰포트(기본 640px 이하) 여부를 반환한다. */
export function useIsMobile(maxWidth = 640): boolean {
  return useMediaQuery(`(max-width: ${maxWidth}px)`);
}
