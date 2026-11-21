# CLAUDE.md — 1D1S Design System

React 컴포넌트 라이브러리. `@1d1s/design-system` 으로 npm 배포, Storybook 은 Vercel 배포.
Tailwind v4 + Radix UI, React 19 peer, 모바일 퍼스트.

> **이 문서는 기능 업데이트마다 같이 갱신한다.** 컴포넌트/토큰/빌드/배포 흐름이
> 바뀌면 코드와 같은 커밋에서 이 파일도 고친다. (특히 아래 ⚠️ 색 정합 규칙)

---

## ⚠️ 가장 중요 — 색·눈금의 정본은 1D1S 웹이다

브랜드 오렌지·회색 램프·의미 토큰의 **정본(source of truth)은 이 레포가 아니라 웹 클라이언트
`1D1S-client` 의 `src/app.styles/colors.css`·`typography.css`** 다(규칙 문서 `docs/flat-design-system.md`).
앱(RN 셸)의 화면이 그 웹이고, 어드민도 같은 파일을 읽는다. DS 의 `src/styles/colors.css` 는 그 값을
**따라 적은 사본**이다.

- 2026-11 플랫 리디자인 값으로 맞췄다: 브랜드 `#ff5900`(다크 `#ff6a1b`), 푸른 기 없는 중립 회색,
  의미 토큰(`bg·fg·sub·mute·line·fill·ink·soft·ok·info·danger`), 카테고리 `cat-*`, 글자 눈금
  `text-ui-*`, 모서리 눈금 `rounded-ui-*`, 면 위의 그림자 없음(`shadow-default`·`shadow-warm` = 0).
- 색을 바꾸는 작업은 **웹 `colors.css` → DS `colors.css`** 를 같은 값으로, 같은 작업 단위에서 맞춘다
  (상용 플러터 앱 `_1d1s_app/lib/core/theme.dart` 의 브랜드도 `#ff5900` 이다). 한쪽만 바꾼 PR 은 미완성이다.
- 웹·어드민은 지금도 자기 토큰 파일로 DS 를 덮어쓴다(같은 값이라 겉모습은 같다). DS 를 올린 뒤
  그 덮어쓰기를 걷는 것은 각 레포의 일이다.
- 새 컴포넌트·수정은 램프(`gray-500`)가 아니라 의미 토큰(`text-sub`)으로 적는다. 램프의 네 칸은 의미
  토큰과 같은 값이라(100=fill · 200=line · 400=mute · 500=sub · 900=fg) 램프로 적힌 기존 컴포넌트도
  같은 색을 낸다.

`colors.css` 자체에 다크 테마·셀렉터 명시도(`.dark.dark`) 관련 주석이 길게 달려
있다 — 다크 토큰 건드리기 전 그 주석을 읽을 것. (주석 안에서 `*` `/` 를 붙여 쓰면
CSS 주석이 거기서 끝나 다크 블록이 통째로 날아간다 — 과거 프로덕션 사고.)

---

## 구조

```
src/
  components/<Name>/   컴포넌트별 폴더: <Name>.tsx + <Name>.stories.tsx + index.ts
  components/index.ts  ← 컴포넌트 export 정본 (README 아님, README 는 오래됨)
  hooks/               useMediaQuery 등
  lib/utils.ts         cn() 등
  styles/              colors / typography / shape / shadow / animation / globals.css
  index.ts             배럴: components + hooks + lib/utils 재export
```

- 컴포넌트 목록은 **`src/components/index.ts` 가 정본**. README 의 목록은 낡았으니 믿지 말 것.
- 현재 51개 컴포넌트 / 52개 스토리.
- 새 컴포넌트 추가 = 폴더 3파일 + `components/index.ts` 에 export 한 줄.
  (서브패스 진입점·`dist` 미러링·`verify-exports` 가 자동으로 따라온다.)

### 토큰 2층 구조
1. **브랜드 램프** (`colors.css`): `--main-*`, `--gray-*`, `--mint-*`, `green/blue/red/sky/purple`,
   `--brand*`, `--accent`, `--frozen`, `--fixed-white/black`. ← 앱 정합 대상(위 ⚠️).
2. **shadcn 시맨틱 층** (`globals.css`): `--background`, `--primary`, `--card`, `--ring` 등.
컴포넌트는 색을 `bg-main-800` `text-gray-900` 같은 **램프 유틸로만** 적는다.
다크는 `<html class="dark">` 에서 `colors.css` 의 변수만 뒤집어 전환(컴포넌트 무수정).

---

## 빌드 · 테스트

| 명령 | 하는 일 |
|------|---------|
| `pnpm storybook` | 로컬 Storybook (6006). `.claude/launch.json` 의 preview 도 이걸 띄움 |
| `pnpm build` | Storybook 정적 빌드 (Vercel 배포용) |
| `pnpm build:lib` | 라이브러리 빌드: `vite build` → CSS 번들 → `verify-exports.mjs` |
| `pnpm test` | **브라우저 테스트만** (`*.browser.test.tsx`, vitest 브라우저 모드, chromium+webkit). jsdom 이 못 흉내내는 모달/포탈/포커스용 — DatePicker 다이얼로그·Heatmap backgrounds 회귀. 처음엔 `pnpm exec playwright install chromium webkit` 필요. **CI 는 테스트를 돌리지 않는다**(auto-release 는 build 만) — 머지 전 로컬에서 돌릴 것 |
| `pnpm lint` / `pnpm type-check` | eslint / `tsc --noEmit` |

빌드 핵심(건드리기 전 `vite.config.ts` 주석 읽기):
- `preserveModules` 로 컴포넌트별 파일 분리 → 소비 앱 트리셰이킹.
- `dependencies`·`peerDependencies` 는 external (번들 인라인 금지).
- 번들 최상단에 `'use client'` 1회 주입 — 없으면 RSC 에서 `createContext` 로 터짐.
- `verify-exports.mjs` 가 서브패스 진입점 + `'use client'` 유무를 빌드에서 검증.

---

## 버전 · 배포 (`.github/workflows/`)

- **`auto-release.yml`**: `main` push 시 자동. 버전 bump 우선순위:
  1. `workflow_dispatch` 의 `release_as` 2. 커밋/PR 메시지의 `[major]`/`[minor]`/`[patch]`
  토큰(마지막 v태그 이후 전체 스캔, 큰 단계 우선) 3. conventional-commits 자동.
  → `standard-version` 으로 bump+CHANGELOG, `main` 에 push, npm publish, GitHub Release.
  `chore(release):` 커밋은 무한루프 방지로 스킵.
- **커밋 메시지로 버전을 정한다**: feature 는 `feat(X): … [minor]`, fix 는 `fix(X): … [patch]`.
- ⚠️ **토큰이 없어도 릴리스된다.** `docs:`·`chore:` 커밋만 있어도 standard-version 이
  patch 를 올려 npm 에 발행한다. `paths-ignore` 는 `CHANGELOG.md`·`package.json`·`.github/**`
  뿐이라 `CLAUDE.md`·README 수정도 걸린다. **릴리스 없이 main 에 올리려면 커밋 메시지
  (squash 면 PR 제목)에 `[skip ci]`** 를 넣는다. 이때 `push-to-fork` 미러도 같이 건너뛰지만,
  다음 main push 때 트리 전체가 미러되므로 따라잡는다.
- `push-to-fork.yml`: `main`/`develop` 을 `NOGUEN/1D1S-design-system` 포크로 미러.
