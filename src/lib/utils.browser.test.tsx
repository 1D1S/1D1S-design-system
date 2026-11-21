import { describe, expect, it } from "vitest";

import { cn } from "./utils";

// 소비처의 className 이 DS 기본값을 실제로 덮는지 — tailwind-merge 가 DS 눈금 이름을 알아야 한다.
describe("cn", () => {
  it("DS 반경·그림자·text-ui 크기를 같은 갈래로 합친다", () => {
    expect(cn("rounded-2.5 rounded-ui-2xl")).toBe("rounded-ui-2xl");
    expect(cn("rounded-2.5 rounded-full")).toBe("rounded-full");
    expect(cn("shadow-warm shadow-none")).toBe("shadow-none");
    expect(cn("text-ui-sm text-ui-lg")).toBe("text-ui-lg");
  });

  it("text-ui 크기가 글자색을 지우지 않는다", () => {
    expect(cn("text-fixed-white text-ui-base")).toBe("text-fixed-white text-ui-base");
  });
});
