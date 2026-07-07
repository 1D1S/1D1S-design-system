"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";
import { Plus } from "../Icons/Plus";
import { Close } from "../Icons/Close";

export interface ThumbnailPickerProps {
  /** 현재 미리보기 이미지 URL 목록 (순서 유지, blob:/data:/https: 모두 가능) */
  previews: string[];
  /** 파일 추가 선택 시 호출 — 여러 장 선택 가능, 남은 슬롯 수만큼 잘라 전달 */
  onSelectFiles: (files: File[]) => void;
  /** 특정 인덱스의 이미지를 제거할 때 호출 */
  onRemove: (index: number) => void;
  /**
   * 최대 업로드 장수. 기본값은 무제한.
   * `1` 로 주면 단일 업로드(첫 장 선택 후 추가 타일 숨김)로 동작한다.
   */
  max?: number;
  /** 정사각형 한 변 크기(px). 기본값 150. */
  size?: number;
  /**
   * 허용 MIME 타입. OS 파일 선택창 필터(accept)와 실제 검증(드래그 드롭
   * 포함)에 모두 사용된다. 기본값 JPG·PNG·GIF (webp/svg 등 차단).
   */
  acceptedTypes?: string[];
  /** 허용되지 않은 타입 선택 시 호출 (기본: 무시) — 토스트 등 피드백용 */
  onInvalidFile?: (file: File) => void;
  /** 하단 도움말 텍스트. 기본값 "JPG, PNG, GIF 파일을 업로드할 수 있습니다." */
  helperText?: string;
  /** 추가 타일 라벨. 기본값 "사진 추가". */
  addLabel?: string;
  /** 전체 비활성화 여부 */
  disabled?: boolean;
  /** 추가 className (바깥 래퍼) */
  className?: string;
}

/**
 * ThumbnailPicker
 * 정사각형 썸네일 형태의 이미지 선택 컴포넌트. 단일·다중 업로드를 모두 지원한다.
 *
 * - `max` 미지정: 무제한 다중 업로드
 * - `max={1}`: 단일 업로드
 *
 * 클릭 또는 드래그 앤 드롭으로 이미지를 추가하고, 각 썸네일의 제거 버튼으로
 * 개별 삭제한다. 상태(어떤 이미지가 선택됐는지)는 소비처가 소유한다.
 *
 * @example
 * ```tsx
 * // 다중
 * <ThumbnailPicker
 *   previews={urls}
 *   onSelectFiles={(files) => addFiles(files)}
 *   onRemove={(i) => removeAt(i)}
 * />
 * // 단일
 * <ThumbnailPicker max={1} previews={url ? [url] : []} ... />
 * ```
 */
export function ThumbnailPicker({
  previews,
  onSelectFiles,
  onRemove,
  max,
  size = 150,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif"],
  onInvalidFile,
  helperText = "JPG, PNG, GIF 파일을 업로드할 수 있습니다.",
  addLabel = "사진 추가",
  disabled = false,
  className,
}: ThumbnailPickerProps): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const remaining = max === undefined ? Infinity : Math.max(0, max - previews.length);
  const canAdd = !disabled && remaining > 0;
  const allowMultiple = remaining > 1;

  const boxStyle = { width: size, height: size } as const;

  const acceptFiles = (fileList: FileList | null): void => {
    if (!fileList || remaining <= 0) return;

    const valid: File[] = [];
    for (const file of Array.from(fileList)) {
      if (acceptedTypes.includes(file.type)) {
        valid.push(file);
      } else {
        onInvalidFile?.(file);
      }
    }

    if (valid.length === 0) return;
    // 남은 슬롯 수만큼만 전달 (Infinity 면 전부)
    onSelectFiles(
      remaining === Infinity ? valid : valid.slice(0, remaining)
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    acceptFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setIsDragging(false);
    if (!canAdd) return;
    acceptFiles(event.dataTransfer.files);
  };

  return (
    <div className={cn("stagger-in", className)}>
      <div className="flex flex-wrap gap-2.5">
        {previews.map((preview, index) => (
          <div
            key={`${preview}-${index}`}
            className="relative shrink-0 overflow-hidden rounded-3 border border-gray-200"
            style={boxStyle}
          >
            <img
              src={preview}
              alt={`첨부 이미지 ${index + 1}`}
              className="h-full w-full object-cover"
            />
            {!disabled ? (
              <button
                type="button"
                aria-label={`이미지 ${index + 1} 제거`}
                onClick={() => onRemove(index)}
                className={cn(
                  "absolute top-1.5 right-1.5 flex h-6 w-6 items-center",
                  "justify-center rounded-full bg-black/60 text-white",
                  "transition-colors hover:bg-black/75"
                )}
              >
                <Close className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        ))}

        {canAdd ? (
          <button
            type="button"
            aria-label={addLabel}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              if (!isDragging) setIsDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            className={cn(
              "flex shrink-0 cursor-pointer flex-col items-center justify-center",
              "gap-1.5 rounded-3 border-2 border-dashed bg-white text-gray-500",
              "transition-colors outline-none",
              "focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2",
              isDragging
                ? "border-main-700 bg-main-100"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            )}
            style={boxStyle}
          >
            <Plus className="h-6 w-6" />
            <Text size="caption2" weight="medium" className="text-gray-500">
              {addLabel}
            </Text>
          </button>
        ) : null}
      </div>

      {helperText ? (
        <Text
          size="caption2"
          weight="regular"
          className="mt-2 block text-gray-400"
        >
          {helperText}
        </Text>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        multiple={allowMultiple}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
