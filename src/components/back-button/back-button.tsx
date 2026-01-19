'use client';

import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from '../icons/ChevronLeft';

export function BackButton(): React.ReactElement {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        'rounded-2 shadow-default flex h-15 w-15',
        'cursor-pointer items-center',
        'justify-center bg-white px-4 py-4',
        'text-sm transition-colors',
        'duration-200 hover:bg-gray-300'
      )}
    >
      <ChevronLeft width={24} height={24} className="text-black" />
    </button>
  );
}
