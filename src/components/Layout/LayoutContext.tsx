"use client";

import React from "react";

export interface AppLayoutContextValue {
  /** 오른쪽 사이드바가 렌더링되어 있는지 여부 */
  hasRightSidebar: boolean;
  /** 오른쪽 사이드바가 접혀있는지 여부 */
  isRightSidebarCollapsed: boolean;
}

const AppLayoutContext = React.createContext<AppLayoutContextValue>({
  hasRightSidebar: false,
  isRightSidebarCollapsed: false,
});

export function AppLayoutProvider({
  value,
  children,
}: {
  value: AppLayoutContextValue;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <AppLayoutContext.Provider value={value}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export function useAppLayoutContext(): AppLayoutContextValue {
  return React.useContext(AppLayoutContext);
}
