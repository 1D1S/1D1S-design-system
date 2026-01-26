'use client';

import { usePathname } from 'next/navigation';

import { ProfileCard } from '../ProfileCard';
import { BackButton } from '../BackButton';
import { Menu } from '../Menu';

export function GlobalChrome({ pathname: propPathname }: { pathname?: string } = {}): React.ReactElement | null {
  const currentPathname = usePathname();
  const pathname = propPathname ?? currentPathname;

  const noChromeRoutes = ['/diary/create', '/challenge/create'];
  const backOnlyRoutes = ['/auth/login'];
  const noProfileRoutes = ['/mypage']; // 프로필 카드가 숨겨질 경로들

  if (!pathname) {
    return null;
  }

  const isBackOnly = backOnlyRoutes.some((prefix) => pathname.startsWith(prefix));
  const isNoChrome = noChromeRoutes.some((prefix) => pathname.startsWith(prefix));
  const isNoProfile = noProfileRoutes.some((prefix) => pathname.startsWith(prefix));

  if (isNoChrome) {
    return null;
  }

  if (isBackOnly) {
    return (
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50">
        <BackButton />
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50">
        <Menu />
      </div>
      {!isNoProfile && (
        <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
          <ProfileCard />
        </div>
      )}
    </>
  );
}
