'use client';

import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from '../Icons/ChevronLeft';

export function BackButton(): React.ReactElement {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        'rounded-2 shadow-default flex h-11 w-11 sm:h-15 sm:w-15',
        'cursor-pointer items-center',
        'justify-center bg-white p-2 sm:px-4 sm:py-4',
        'text-sm transition-colors',
        'duration-200 hover:bg-gray-300'
      )}
    >
      <ChevronLeft width={20} height={20} className="text-black sm:w-6 sm:h-6" />
    </button>
  );
}
