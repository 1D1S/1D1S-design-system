'use client';

import Image from 'next/image';
import React from 'react';
import { Text } from '../Text';
import { Button } from '../Button';
import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';
import { Chevron } from '../Icons/Chevron';

type Mode = 'collapsed' | 'expanding' | 'expanded' | 'collapsing';

export function ProfileCard({
  initialMode = 'collapsed',
}: {
  initialMode?: Mode;
}): React.ReactElement {
  const router = useRouter();
  const isLoggedIn = false;
  const [mode, setMode] = React.useState<Mode>(initialMode);

  const isExpanded = mode === 'expanded' || mode === 'expanding';
  const shouldRenderContent = mode === 'expanded' || mode === 'collapsing'; // ❗️expanding 상태 제외

  const handleToggle = (): void => {
    if (mode === 'collapsed') {
      setMode('expanding');
      setTimeout(() => setMode('expanded'), 300);
    } else if (mode === 'expanded') {
      setMode('collapsing');
      setTimeout(() => setMode('collapsed'), 200);
    }
  };

  const handleGoLogin = (): void => {
    router.push('/auth/login');
  };

  const handleGoDiary = (): void => {
    router.push('/diary/create');
  };

  return (
    <div
      className={cn(
        'rounded-2 shadow-default relative flex flex-col bg-white transition-all duration-300 ease-in-out',
        mode === 'collapsed' ? 'h-14 w-14 sm:h-20 sm:w-20 justify-center p-2 sm:p-4' : 'w-72 sm:w-100 p-4 sm:p-6'
      )}
      onClick={isExpanded !== true ? handleToggle : undefined}
    >
      {/* 항상 보이는 프로필 이미지 */}
      <div className="flex w-full">
        <Image
          src="/DefaultProfile.png"
          alt="profile-image"
          className="rounded-full object-cover w-10 h-10 sm:w-[50px] sm:h-[50px]"
          width={50}
          height={50}
        />

        {/* 텍스트 콘텐츠 */}
        {shouldRenderContent && (
          <div
            className={cn(
              'ml-3 sm:ml-4 flex flex-col justify-between',
              mode === 'expanded' && 'fade-in',
              mode === 'collapsing' && 'fade-out'
            )}
          >
            <Text size="body2" weight="medium" className="sm:text-xl">
              로그인이 필요해요.
            </Text>
            <Text size="caption3" weight="regular" className="sm:text-sm">
              오늘의 목표 ?개
            </Text>
          </div>
        )}
      </div>

      {shouldRenderContent && (
        <div
          className={cn(
            'mt-4 sm:mt-6 flex w-full items-center justify-center',
            mode === 'expanded' && 'fade-in',
            mode === 'collapsing' && 'fade-out'
          )}
        >
          <Text size="body1" weight="bold" className="text-main-900 sm:text-2xl">
            ??
          </Text>
          <Text size="body1" weight="bold" className="sm:text-2xl">
            일 연속 수행
          </Text>
        </div>
      )}

      {shouldRenderContent && (
        <div
          className={cn(
            'mt-4 sm:mt-6',
            mode === 'expanded' && 'fade-in',
            mode === 'collapsing' && 'fade-out'
          )}
        >
          <Button className="w-full" size="medium" onClick={isLoggedIn ? handleGoDiary : handleGoLogin}>
            {isLoggedIn ? '일지 쓰러 가기 →' : '로그인 하러 가기 →'}
          </Button>
        </div>
      )}

      {/* 왼쪽 하단 꺽쇠 버튼 */}
      <button
        onClick={handleToggle}
        disabled={initialMode === 'expanded'}
        hidden={initialMode === 'expanded'}
        className="absolute bottom-2 left-2 text-gray-400 transition-transform duration-300 hover:text-black"
      >
        <Chevron
          width={12}
          height={12}
          className={cn('transition-transform duration-300', isExpanded && 'rotate-180')}
        />
      </button>
    </div>
  );
}
