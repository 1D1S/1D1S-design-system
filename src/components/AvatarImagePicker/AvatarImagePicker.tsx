"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Logo, PencilLine } from "../Icons";

export interface AvatarImagePickerProps extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  /** 원형 이미지 영역 지름(px) */
  size?: number;
  /** 초기 이미지 URL */
  defaultImageUrl?: string;
  /** 하단 변경 버튼 텍스트 */
  changeLabel?: string;
}

/**
 * AvatarImagePicker
 * 이미지 업로드 및 미리보기를 위한 컴포넌트
 *
 * @param onChange 파일 선택 시 호출되는 콜백 함수(optional)
 * @param size 원형 이미지 영역 지름(px), 기본값 300
 * @param defaultImageUrl 초기 이미지 URL
 * @param changeLabel 하단 변경 버튼 텍스트(기본값: Change)
 *
 * @example 기본 사용
 * ```tsx
 * <AvatarImagePicker onChange={(e) => console.log(e.target.files)} />
 * ```
 */
export function AvatarImagePicker({
  onChange,
  size = 300,
  defaultImageUrl,
  changeLabel = "Change",
  ...props
}: AvatarImagePickerProps): React.ReactElement {
  const normalizedSize = Math.max(size, 120);
  const fallbackLogoHeight = Math.max(Math.round(normalizedSize * 0.3), 28);
  const fallbackLogoWidth = Math.max(Math.round(fallbackLogoHeight * 0.6), 18);

  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(defaultImageUrl ?? null);

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  useEffect(() => {
    setPreview(defaultImageUrl ?? null);
  }, [defaultImageUrl]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const url = URL.createObjectURL(file);
      objectUrlRef.current = url;
      setPreview(url);
    }
  };

  return (
    <div
      className="relative inline-flex"
      style={{ width: normalizedSize, height: normalizedSize }}
    >
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
      <button
        type="button"
        onClick={handleClick}
        aria-label="이미지 선택"
        className={cn(
          "group relative h-full w-full cursor-pointer overflow-hidden rounded-full bg-gray-100 outline-none transition-[border-color,box-shadow,background-color] duration-200",
          "focus-visible:ring-3 focus-visible:ring-main-300/60",
          !preview && "border-2 border-dashed border-gray-200 bg-white hover:border-gray-300",
        )}
      >
        {preview ? (
          <img
            src={preview}
            alt="이미지 미리보기"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Logo
              width={fallbackLogoWidth}
              height={fallbackLogoHeight}
              className="text-gray-400"
            />
          </div>
        )}
      </button>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        pill
        onClick={handleClick}
        iconLeft={<PencilLine className="h-3.5 w-3.5 text-gray-700" />}
        className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 px-4 text-gray-700 shadow-lg"
      >
        {changeLabel}
      </Button>
    </div>
  );
}
