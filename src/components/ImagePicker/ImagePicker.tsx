"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Logo, PencilLine } from "../Icons";
import { Text } from "../Text";

export interface ImagePickerProps extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  /** 원형 이미지 영역 지름(px) */
  size?: number;
  /** 초기 이미지 URL */
  defaultImageUrl?: string;
  /** 하단 변경 버튼 텍스트 */
  changeLabel?: string;
}

/**
 * ImagePicker
 * 이미지 업로드 및 미리보기를 위한 컴포넌트
 *
 * @param onChange 파일 선택 시 호출되는 콜백 함수(optional)
 * @param size 원형 이미지 영역 지름(px), 기본값 300
 * @param defaultImageUrl 초기 이미지 URL
 * @param changeLabel 하단 변경 버튼 텍스트(기본값: Change)
 *
 * @example 기본 사용
 * ```tsx
 * <ImagePicker onChange={(e) => console.log(e.target.files)} />
 * ```
 */
export function ImagePicker({
  onChange,
  size = 300,
  defaultImageUrl,
  changeLabel = "Change",
  ...props
}: ImagePickerProps): React.ReactElement {
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
          "relative h-full w-full overflow-hidden rounded-full",
          "cursor-pointer",
          preview
            ? "bg-main-300"
            : "border-2 border-dashed border-gray-400 bg-white",
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
              className="text-gray-300"
            />
          </div>
        )}
      </button>

      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "absolute bottom-0 left-1/2 z-10 inline-flex h-9 -translate-x-1/2 translate-y-1/2 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-5",
          "cursor-pointer shadow-[0_6px_16px_rgba(34,34,34,0.16)]",
        )}
      >
        <PencilLine className="h-3.5 w-3.5 text-gray-700" />
        <Text size="caption1" weight="medium" className="text-gray-700">
          {changeLabel}
        </Text>
      </button>
    </div>
  );
}
