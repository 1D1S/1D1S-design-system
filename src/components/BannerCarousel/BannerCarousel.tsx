"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export interface BannerCarouselItem {
  id?: string | number;
  type: string;
  title: string;
  subtitle: string;
  backgroundImageUrl?: string;
  /** @deprecated `backgroundImageUrl`을 사용하세요. */
  backgroundImage?: string;
}

export interface BannerTrackingPayload {
  event: "impression" | "click" | "change";
  componentId?: string;
  bannerId: string;
  bannerIndex: number;
  bannerType: string;
  bannerTitle: string;
  bannerSubtitle: string;
  timestamp: number;
}

export interface BannerCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BannerCarouselItem[];
  autoSlideIntervalMs?: number;
  initialIndex?: number;
  enableLoop?: boolean;
  showIndicators?: boolean;
  aspectRatioClassName?: string;
  componentId?: string;
  enableDataLayerTracking?: boolean;
  impressionMode?: "once" | "always";
  onBannerClick?(payload: BannerTrackingPayload): void;
  onBannerImpression?(payload: BannerTrackingPayload): void;
  onBannerChange?(payload: BannerTrackingPayload): void;
  onItemClick?(item: BannerCarouselItem, index: number): void;
}

const DATA_LAYER_EVENT_PREFIX = "banner";
const DEFAULT_GRADIENT_FROM = "#FF6D2D";
const DEFAULT_GRADIENT_TO = "#FF9A3E";

/**
 * BannerCarousel
 * 메인 배너 슬라이더 컴포넌트. 자동 슬라이드, 무한 루프, 인디케이터를 지원하며
 * 클릭/노출 추적 콜백 및 dataLayer 이벤트 전송 포인트를 제공합니다.
 */
export function BannerCarousel({
  items,
  autoSlideIntervalMs = 5000,
  initialIndex = 0,
  enableLoop = true,
  showIndicators = true,
  aspectRatioClassName = "aspect-[4/1]",
  componentId,
  enableDataLayerTracking = false,
  impressionMode = "once",
  onBannerClick,
  onBannerImpression,
  onBannerChange,
  onItemClick,
  className,
  ...props
}: BannerCarouselProps): React.ReactElement | null {
  const itemCount = items.length;

  const normalizedInitialIndex = React.useMemo<number>(() => {
    if (itemCount === 0) return 0;
    if (initialIndex < 0) return 0;
    if (initialIndex > itemCount - 1) return itemCount - 1;
    return initialIndex;
  }, [initialIndex, itemCount]);

  const canLoop = enableLoop && itemCount > 1;

  const slides = React.useMemo<BannerCarouselItem[]>(() => {
    if (itemCount === 0) return [];
    if (!canLoop) return items;

    const [firstItem] = items;
    const [lastItem] = items.slice(-1);
    return [lastItem, ...items, firstItem];
  }, [canLoop, itemCount, items]);

  const [bannerIndex, setBannerIndex] = React.useState<number>(
    canLoop ? normalizedInitialIndex + 1 : normalizedInitialIndex,
  );
  const [isTransitionOn, setIsTransitionOn] = React.useState<boolean>(true);

  React.useEffect(() => {
    setBannerIndex(canLoop ? normalizedInitialIndex + 1 : normalizedInitialIndex);
  }, [canLoop, normalizedInitialIndex, itemCount]);

  React.useEffect(() => {
    if (itemCount <= 1 || autoSlideIntervalMs <= 0) {
      return undefined;
    }

    const autoSlideTimer = window.setInterval(() => {
      setBannerIndex((prev) => prev + 1);
    }, autoSlideIntervalMs);

    return () => window.clearInterval(autoSlideTimer);
  }, [autoSlideIntervalMs, itemCount]);

  React.useEffect(() => {
    if (isTransitionOn) {
      return undefined;
    }

    const resetTransitionTimer = window.setTimeout(() => {
      setIsTransitionOn(true);
    }, 30);

    return () => window.clearTimeout(resetTransitionTimer);
  }, [isTransitionOn]);

  const activeIndex =
    itemCount === 0 ? 0 : ((bannerIndex - (canLoop ? 1 : 0) + itemCount) % itemCount + itemCount) % itemCount;
  const seenImpressionKeysRef = React.useRef<Set<string>>(new Set());

  const emitTracking = React.useCallback(
    (event: BannerTrackingPayload["event"], banner: BannerCarouselItem, index: number) => {
      const resolvedBannerId = banner.id === undefined ? `${index}` : String(banner.id);
      const payload: BannerTrackingPayload = {
        event,
        componentId,
        bannerId: resolvedBannerId,
        bannerIndex: index,
        bannerType: banner.type,
        bannerTitle: banner.title,
        bannerSubtitle: banner.subtitle,
        timestamp: Date.now(),
      };

      if (event === "click") {
        onBannerClick?.(payload);
      }

      if (event === "impression") {
        onBannerImpression?.(payload);
      }

      if (event === "change") {
        onBannerChange?.(payload);
      }

      if (enableDataLayerTracking && typeof window !== "undefined") {
        const windowWithDataLayer = window as Window & {
          dataLayer?: Array<Record<string, unknown>>;
        };

        if (Array.isArray(windowWithDataLayer.dataLayer)) {
          windowWithDataLayer.dataLayer.push({
            event: `${DATA_LAYER_EVENT_PREFIX}_${event}`,
            component_id: componentId ?? "banner-carousel",
            banner_id: payload.bannerId,
            banner_index: payload.bannerIndex,
            banner_type: payload.bannerType,
            banner_title: payload.bannerTitle,
            banner_subtitle: payload.bannerSubtitle,
            timestamp: payload.timestamp,
          });
        }
      }
    },
    [componentId, enableDataLayerTracking, onBannerChange, onBannerClick, onBannerImpression],
  );

  React.useEffect(() => {
    if (itemCount === 0) return;

    const banner = items[activeIndex];
    if (!banner) return;

    emitTracking("change", banner, activeIndex);

    const impressionKey = `${banner.id === undefined ? `${activeIndex}` : String(banner.id)}-${activeIndex}`;
    const isAlreadySeen = seenImpressionKeysRef.current.has(impressionKey);

    if (impressionMode === "once" && isAlreadySeen) {
      return;
    }

    seenImpressionKeysRef.current.add(impressionKey);
    emitTracking("impression", banner, activeIndex);
  }, [activeIndex, emitTracking, impressionMode, itemCount, items]);

  const handleTransitionEnd = (): void => {
    if (!canLoop) return;

    if (bannerIndex === itemCount + 1) {
      setIsTransitionOn(false);
      setBannerIndex(1);
      return;
    }

    if (bannerIndex === 0) {
      setIsTransitionOn(false);
      setBannerIndex(itemCount);
    }
  };

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="relative overflow-hidden rounded-4">
        <div
          className={cn("flex", isTransitionOn && "transition-transform duration-500 ease-out")}
          style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((banner, index) => {
            const resolvedBackgroundImageUrl = banner.backgroundImageUrl ?? banner.backgroundImage;
            const isImageEnabled = Boolean(
              resolvedBackgroundImageUrl && resolvedBackgroundImageUrl.trim().length > 0,
            );
            const logicalIndex = itemCount === 0 ? 0 : ((index - (canLoop ? 1 : 0) + itemCount) % itemCount);
            const keyId = banner.id === undefined ? `${logicalIndex}-${index}` : String(banner.id);

            return (
              <button
                key={`${keyId}-${index}`}
                type="button"
                onClick={() => {
                  emitTracking("click", banner, logicalIndex);
                  onItemClick?.(banner, logicalIndex);
                }}
                data-banner-id={banner.id === undefined ? `${logicalIndex}` : String(banner.id)}
                data-banner-index={logicalIndex}
                data-banner-type={banner.type}
                data-banner-title={banner.title}
                data-banner-image-url={resolvedBackgroundImageUrl ?? ""}
                className={cn(
                  "relative w-full shrink-0 overflow-hidden p-6 text-left text-white transition hover:brightness-105",
                  "cursor-pointer",
                  aspectRatioClassName,
                )}
                style={{
                  backgroundImage: `linear-gradient(to right, ${DEFAULT_GRADIENT_FROM}, ${DEFAULT_GRADIENT_TO})`,
                }}
              >
                {isImageEnabled ? (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${resolvedBackgroundImageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-black/28" />
                  </>
                ) : null}

                <div className="pointer-events-none absolute -top-10 -right-8 h-36 w-36 rounded-full bg-white/15 blur-2xl" />

                <div className="relative flex h-full flex-col justify-between">
                  <Text size="caption3" weight="medium" className="text-white/85">
                    {banner.type}
                  </Text>

                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <Text size="heading1" weight="bold" className="line-clamp-1 text-white">
                        {banner.title}
                      </Text>
                      <Text size="body2" weight="medium" className="line-clamp-1 text-white/90">
                        {banner.subtitle}
                      </Text>
                    </div>

                    <Text size="heading1" weight="bold" className="text-white">
                      →
                    </Text>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {showIndicators ? (
          <div className="pointer-events-none absolute right-4 bottom-3 left-4 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/25 px-2 py-1">
              {items.map((banner, index) => (
                <button
                  key={banner.id === undefined ? `${index}` : String(banner.id)}
                  type="button"
                  onClick={() => {
                    setIsTransitionOn(true);
                    setBannerIndex(canLoop ? index + 1 : index);
                  }}
                  className={cn(
                    "h-2 cursor-pointer rounded-full transition-all",
                    activeIndex === index ? "w-5 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
                  )}
                  aria-label={`${index + 1}번째 배너로 이동`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
