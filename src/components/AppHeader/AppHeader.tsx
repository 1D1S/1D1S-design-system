'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
import { CircleAvatar } from '../CircleAvatar';
import { Logo } from '../Icons/Logo';
import { Text } from '../Text';

export interface AppHeaderNavItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface AppHeaderProps {
  brandName?: string;
  logo?: React.ReactNode;
  navItems?: AppHeaderNavItem[];
  activeKey?: string;
  profileImage?: string;
  className?: string;
  onLogoClick?(): void;
  onNavChange?(key: string): void;
  onSearchClick?(): void;
  onNotificationClick?(): void;
  onProfileClick?(): void;
}

const defaultNavItems: AppHeaderNavItem[] = [
  { key: 'home', label: '홈' },
  { key: 'explore', label: '탐색' },
  { key: 'challenge', label: '챌린지' },
  { key: 'diary', label: '일지' },
];

/**
 * AppHeader
 * 로고, 주요 네비게이션, 우측 액션 아이콘을 포함한 상단 헤더 컴포넌트.
 */
export function AppHeader({
  brandName = '1D1S',
  logo,
  navItems = defaultNavItems,
  activeKey = 'challenge',
  profileImage,
  className,
  onLogoClick,
  onNavChange,
  onSearchClick,
  onNotificationClick,
  onProfileClick,
}: AppHeaderProps): React.ReactElement {
  const logoNode = logo ?? <Logo className="h-5 w-3.5 text-white" aria-hidden />;

  return (
    <header className={cn('w-full rounded-4 border border-gray-200 bg-white px-8 py-6', className)}>
      <div className="flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-10">
          <button
            type="button"
            onClick={onLogoClick}
            className="inline-flex shrink-0 items-center gap-3"
            aria-label="홈으로 이동"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-3 bg-main-800">
              {logoNode}
            </span>
            <Text size="heading1" weight="bold" className="text-gray-900">
              {brandName}
            </Text>
          </button>

          <nav className="min-w-0 overflow-x-auto" aria-label="주요 메뉴">
            <ul className="flex items-center gap-8 whitespace-nowrap">
              {navItems.map((item) => {
                const isActive = item.key === activeKey;

                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      disabled={item.disabled}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => onNavChange?.(item.key)}
                      className={cn(
                        'transition-colors',
                        item.disabled && 'cursor-not-allowed opacity-50',
                        !item.disabled && 'hover:text-main-700',
                      )}
                    >
                      <Text
                        size="body1"
                        weight={isActive ? 'bold' : 'medium'}
                        className={cn(isActive ? 'text-main-800' : 'text-gray-600')}
                      >
                        {item.label}
                      </Text>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onSearchClick}
            aria-label="검색"
            className="text-gray-700 hover:text-gray-900"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            aria-label="알림"
            className="text-gray-700 hover:text-gray-900"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <button type="button" onClick={onProfileClick} aria-label="프로필 열기" className="rounded-full">
            <CircleAvatar imageUrl={profileImage} size="md" className="ring-2 ring-mint-900/30" />
          </button>
        </div>
      </div>
    </header>
  );
}
