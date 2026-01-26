"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Logo } from "../Icons/Logo";
import { Plus } from "../Icons/Plus";
import { cn } from "@/lib/utils";

/**
 * ImagePicker
 * 이미지 업로드 및 미리보기를 위한 컴포넌트
 *
 * @param onChange 파일 선택 시 호출되는 콜백 함수(optional)
 *
 * @example 기본 사용
 * ```tsx
 * <ImagePicker onChange={(e) => console.log(e.target.files)} />
 * ```
 */
export function ImagePicker({
  onChange,
  ...props
}: React.ComponentPropsWithoutRef<"input">): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="relative h-20 w-20 sm:h-25 sm:w-25 cursor-pointer" onClick={handleClick}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange !== undefined) {
            onChange(event);
          }
          handleChange(event);
        }}
        {...props}
      />
      <div
        className={cn(
          "bg-main-300 flex h-full w-full",
          "items-center justify-center rounded-full overflow-hidden",
        )}
      >
        {preview ? (
          <Image
            src={preview}
            alt="이미지 미리보기"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <Logo width={24} height={40} className="text-main-700 sm:w-[30px] sm:h-[50px]" />
        )}
      </div>
      <div className="absolute right-0 bottom-0 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white inset-ring-1 inset-ring-gray-400">
        <Plus width={24} height={24} className="text-gray-500" />
      </div>
    </div>
  );
}
