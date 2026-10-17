# CLAUDE.md — 1D1S Design System

React 컴포넌트 라이브러리. `@1d1s/design-system` 으로 npm 배포, Storybook 은 Vercel 배포.
Tailwind v4 + Radix UI, React 19 peer, 모바일 퍼스트.

> **이 문서는 기능 업데이트마다 같이 갱신한다.** 컴포넌트/토큰/빌드/배포 흐름이
> 바뀌면 코드와 같은 커밋에서 이 파일도 고친다. (특히 아래 ⚠️ 색 정합 규칙)

---

## ⚠️ 가장 중요 — 브랜드/회색 색의 정본은 DS 가 아니다

브랜드 오렌지·회색 램프의 **정본(source of truth)은 이 레포가 아니라 네이티브 앱
`_1d1s_app/lib/core/theme.dart` ↔ 웹 클라이언트 `colors.css` 쌍**이다. DS 의
`src/styles/colors.css` 는 그 둘을 **따라 적은 사본**일 뿐이다.

- 현재 **갈라져 있음**: DS 는 `--main-800`/`--accent` = `#ff5722` (`colors.css:113,121,232`),
  앱·웹은 `#ff5900`.
- **이게 웹↔앱 색 불일치의 뿌리다.** 웹은 DS 를 import 한 뒤 자기 `colors.css`
  `:root` 로 램프를 덮어써서 앱 색을 유지한다. 그래서 **DS 버전만 올리고(2.x)
  app/web 을 같이 안 고치면** — DS 의 새 색·새 토큰이 덮어쓰기를 빠져나가거나,
  웹이 DS 의 옛 값에 기대던 곳이 바뀌어 — **소비처끼리 색이 갈라진다.**
- 색을 바꾸는 DS 릴리스는 **app `theme.dart` → web `colors.css` → DS `colors.css`
  세 곳을 같은 값으로, 같은 작업 단위에서** 맞춘다. 셋 중 하나만 바꾼 PR 은 미완성이다.
- 색 관련 작업이면 어느 값이 맞는지 먼저 사용자에게 확인하고(앱 값이 기준),
  DS 만 단독으로 고치지 말 것.

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

---

## ⚠️ 현재 브랜치 상태 (2026-10-17)

- 로컬 `main` 이 `origin/main` 과 갈라져 있던 2커밋(StatCard/SectionHeader, DatePicker)은
  PR #24 로 main 에 반영됐다(→ 2.18.0). 원본은 `origin/preserve/main-local` 에 남아 있다.
- 남은 일(사용자 확인 후): 로컬 `main` 을 `origin/main` 으로 맞추기
  (`git reset --hard origin/main`), `preserve/main-local` 삭제 여부 결정, **이 섹션 삭제.**
