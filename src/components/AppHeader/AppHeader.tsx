'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
import { CircleAvatar } from '../CircleAvatar';
import { Bell } from '../Icons';
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
  showProfile?: boolean;
  profileImage?: string;
  className?: string;
  onLogoClick?(): void;
  onNavChange?(key: string): void;
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
  showProfile = true,
  profileImage,
  className,
  onLogoClick,
  onNavChange,
  onNotificationClick,
  onProfileClick,
}: AppHeaderProps): React.ReactElement {
  const logoNode = logo ?? <Logo className="h-5 w-3.5 text-white" aria-hidden />;

  return (
    <header className={cn('w-full rounded-4 border border-gray-200 bg-white px-6 py-4', className)}>
      <div className="flex items-center justify-between gap-5">
        <div className="flex min-w-0 items-center gap-8">
          <button
            type="button"
            onClick={onLogoClick}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2"
            aria-label="홈으로 이동"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-3 bg-main-800">
              {logoNode}
            </span>
            <Text size="heading2" weight="bold" className="text-gray-900">
              {brandName}
            </Text>
          </button>

          <nav className="min-w-0 overflow-x-auto" aria-label="주요 메뉴">
            <ul className="flex items-center gap-6 whitespace-nowrap">
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
                        'cursor-pointer transition-colors',
                        item.disabled && 'cursor-not-allowed opacity-50',
                        !item.disabled && 'hover:text-main-700',
                      )}
                    >
                      <Text
                        size="body2"
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

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            aria-label="알림"
            className="cursor-pointer text-gray-700 hover:text-gray-900"
          >
            <Bell className="h-4 w-4" />
          </Button>

          {showProfile ? (
            <button
              type="button"
              onClick={onProfileClick}
              aria-label="프로필 열기"
              className="cursor-pointer rounded-full"
            >
              <CircleAvatar imageUrl={profileImage} size="sm" className="ring-2 ring-mint-900/30" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
