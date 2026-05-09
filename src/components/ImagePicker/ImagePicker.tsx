"use client";
import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Text } from "../Text";

export interface ImagePickerProps {
  /** 현재 미리보기 이미지 URL (blob: / data: / https: 모두 가능) */
  previewUrl?: string;
  /** 파일 선택 시 호출되는 콜백 */
  onSelectFile: (file: File) => void;
  /** 선택 해제 버튼 클릭 시 호출되는 콜백 */
  onClear?: () => void;
  /** 이미지 미선택 시 안내 텍스트 (기본값: "썸네일 영역을 클릭해 이미지를 선택하세요.") */
  placeholderTitle?: string;
  /** 이미지 미선택 시 보조 안내 텍스트 (기본값: "또는 이미지를 드래그해서 놓아주세요.") */
  placeholderSubtitle?: string;
  /** 하단 도움말 텍스트 (기본값: "JPG, PNG, GIF 파일을 업로드할 수 있습니다.") */
  helperText?: string;
  /** 선택 해제 버튼 텍스트 (기본값: "선택 해제") */
  clearLabel?: string;
  /**
   * 드롭존 영역의 크기·비율을 지정하는 className.
   * 기본값: `aspect-video`
   * @example "aspect-[4/1]", "aspect-square", "h-64"
   */
  dropZoneClassName?: string;
  /** 추가 className */
  className?: string;
}

/**
 * ImagePicker
 * 일지 썸네일 이미지 선택 컴포넌트
 *
 * 클릭 또는 드래그 앤 드롭으로 이미지를 선택할 수 있습니다.
 *
 * @param previewUrl 현재 미리보기 이미지 URL
 * @param onSelectFile 파일 선택 시 호출되는 콜백
 * @param onClear 선택 해제 버튼 클릭 시 호출되는 콜백
 * @param placeholderTitle 이미지 미선택 시 안내 텍스트
 * @param placeholderSubtitle 이미지 미선택 시 보조 안내 텍스트
 * @param helperText 하단 도움말 텍스트
 * @param clearLabel 선택 해제 버튼 텍스트
 * @param className 추가 className
 *
 * @example
 * ```tsx
 * <ImagePicker
 *   previewUrl={previewUrl}
 *   onSelectFile={(file) => setFile(file)}
 *   onClear={() => setFile(null)}
 * />
 * ```
 */
export function ImagePicker({
  previewUrl,
  onSelectFile,
  onClear,
  placeholderTitle = "썸네일 영역을 클릭해 이미지를 선택하세요.",
  placeholderSubtitle = "또는 이미지를 드래그해서 놓아주세요.",
  helperText = "JPG, PNG, GIF 파일을 업로드할 수 있습니다.",
  clearLabel = "선택 해제",
  dropZoneClassName = "min-h-[220px] flex-1 lg:min-h-[440px]",
  className,
}: ImagePickerProps): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [failedPreviewUrl, setFailedPreviewUrl] = useState<string | null>(null);

  const hasPreviewImage =
    Boolean(previewUrl) && failedPreviewUrl !== previewUrl;
  const hasThumbnail = Boolean(previewUrl);

  const handlePickClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (file: File | null): void => {
    if (!file || !file.type.startsWith("image/")) return;
    setFailedPreviewUrl(null);
    onSelectFile(file);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0] ?? null;
    handleFileSelect(file);
    event.target.value = "";
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    handleFileSelect(file);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePickClick();
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4",
        className
      )}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="썸네일 이미지 선택"
        className={cn(
          "relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border bg-gray-100 transition outline-none",
          dropZoneClassName,
          isDragging
            ? "border-main-700 ring-3 ring-main-300"
            : "border-gray-200 hover:border-gray-300"
        )}
        onClick={handlePickClick}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {hasPreviewImage ? (
          <img
            src={previewUrl}
            alt="썸네일 미리보기"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setFailedPreviewUrl(previewUrl ?? null)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <Text size="body2" weight="medium" className="text-gray-700">
              {placeholderTitle}
            </Text>
            <Text size="caption1" weight="regular" className="text-gray-500">
              {placeholderSubtitle}
            </Text>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Text size="caption1" weight="regular" className="text-gray-500">
          {helperText}
        </Text>
        {hasThumbnail && onClear ? (
          <Button
            type="button"
            variant="outlined"
            size="small"
            className="shrink-0"
            onClick={onClear}
          >
            {clearLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
