import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * 소비처가 넘긴 className 이 DS 기본값을 덮으려면 tailwind-merge 가 DS 의 눈금 이름을 알아야 한다.
 * 모르는 이름은 다른 갈래로 분류되거나(`text-ui-base` 를 글자 **색**으로 읽어 앞의 `text-fixed-white`
 * 를 지운다) 아예 안 겹치는 것으로 보여 둘 다 남는다(`rounded-2.5 rounded-ui-2xl`, `shadow-warm shadow-none`).
 * 1D1S 웹(src/app.module/utils/cn.ts)과 같은 설정이다.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [(value: string) => value.startsWith("ui-")] }],
      rounded: [
        {
          rounded: [
            "0",
            "0.5",
            "1",
            "1.5",
            "2",
            "2.5",
            "3",
            "4",
            (value: string) => value.startsWith("ui-"),
          ],
        },
      ],
      shadow: [
        {
          shadow: [
            "default",
            "up",
            "warm",
            "brand-glow",
            "knob",
            "focus",
            "focus-error",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
