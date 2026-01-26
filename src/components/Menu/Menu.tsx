'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Text } from '../Text';
import { HamburgerMenu } from '../Icons/HamburgerMenu';
import { Close } from '../Icons/Close';

const menuItems = [
  { label: '메인', path: '/' },
  { label: '챌린지', path: '/challenge' },
  { label: '일지', path: '/diary' },
  { label: '마이페이지', path: '/mypage' },
];

export function Menu(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  // ESC로 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* 햄버거 버튼 */}
      <div
        className="rounded-2 shadow-default fixed top-3 left-3 sm:top-4 sm:left-4 z-50 flex h-11 w-11 sm:h-15 sm:w-15 cursor-pointer items-center justify-center bg-white"
        onClick={() => setIsOpen(true)}
      >
        <HamburgerMenu width={16} height={16} className="text-black sm:w-[18px] sm:h-[18px]" />
      </div>

      {/* 오버레이 배경 */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setIsOpen(false)} />
      )}

      {/* 드로어 메뉴 */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 sm:w-75 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-3 sm:p-4">
          <button className="text-gray-500 hover:text-black p-1" onClick={() => setIsOpen(false)}>
            <Close width={20} height={20} />
          </button>
        </div>
        <nav className="p-4 sm:p-6">
          <ul className="space-y-3 sm:space-y-4">
            {menuItems.map(({ label, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className="mb-6 sm:mb-8 block text-gray-700 transition-colors duration-200 hover:text-black"
                >
                  <Text size="heading2" weight={'bold'} className="sm:text-3xl">
                    {label}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
