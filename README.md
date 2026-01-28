# @1d1s/design-system

1D1S 프로젝트를 위한 React 디자인 시스템입니다. Tailwind CSS와 Radix UI를 기반으로 구축되었으며, 모바일 퍼스트 사용자 경험에 최적화되어 있습니다.

[Storybook 배포 링크](https://your-storybook-url.vercel.app)

> **Note:** 최근 Pagination, ToggleCheck, CheckList, Checkbox, Streak 컴포넌트가 추가되었습니다.

## ✨ 특징

- **Mobile First:** 모바일 환경에 최적화된 UI 컴포넌트 제공
- **Tailwind CSS:** 유틸리티 클래스 기반의 유연한 스타일링
- **Radix UI:** 웹 접근성(A11y)이 준수된 Headless UI 기반
- **TypeScript:** 완전한 타입 지원

## 📦 설치

패키지 매니저를 사용하여 설치합니다.

```bash
pnpm add @1d1s/design-system
```

## 🚀 설정

### 1. 스타일 시트 가져오기

프로젝트의 최상위 진입점(예: `layout.tsx`, `App.tsx`, `index.tsx`)에서 디자인 시스템의 글로벌 스타일을 임포트해야 합니다. 이 파일에는 CSS 변수(색상, 폰트 등)와 Tailwind 설정이 포함되어 있습니다.

```tsx
import '@1d1s/design-system/styles/globals.css';
```

### 2. 폰트 설정 (권장)

이 디자인 시스템은 기본적으로 시스템 폰트를 사용하지만, `Pretendard` 등의 웹 폰트와 함께 사용할 것을 권장합니다.

## 💻 사용법

컴포넌트를 임포트하여 바로 사용할 수 있습니다.

```tsx
import { Button, Checkbox, Text } from '@1d1s/design-system';

function App() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Text size="heading1" weight="bold">Hello Design System</Text>
      
      <Button variant="default" onClick={() => console.log('Clicked')}>
        Click Me
      </Button>

      <Checkbox label="동의합니다" />
    </div>
  );
}
```

## 🧩 컴포넌트 목록

### Layout & Navigation
- **GlobalChrome:** 앱의 전체적인 레이아웃(헤더, 네비게이션, 모바일 시뮬레이션)을 담당합니다.
- **Menu:** 햄버거 메뉴 및 사이드바 네비게이션.
- **Footer:** 페이지 하단 푸터.
- **BackButton:** 뒤로가기 버튼.
- **PageTitle:** 페이지 제목 섹션.
- **PageBackground:** 페이지 배경 컨테이너.

### Inputs & Controls
- **Button:** 다양한 변형(Default, Outline, Ghost 등)을 지원하는 버튼.
- **TextField:** 텍스트 입력 필드 (단일/멀티라인).
- **Checkbox:** 라벨을 지원하는 표준 체크박스.
- **Toggle:** 텍스트/아이콘 토글 버튼.
- **ToggleCheck:** 체크 아이콘이 포함된 토글 버튼.
- **ToggleGroup:** 여러 토글 버튼 그룹.
- **CheckList:** 다중 선택이 가능한 체크 리스트.
- **DatePicker:** 캘린더 기반 날짜 선택기.
- **ImagePicker:** 이미지 업로드 및 미리보기.
- **Dropdown:** 선택 메뉴 (Select).

### Data Display
- **Text:** 타이포그래피 스타일을 적용하는 텍스트 컴포넌트.
- **Tag:** 상태나 카테고리를 표시하는 태그.
- **Accordion:** 접고 펼칠 수 있는 컨텐츠 영역.
- **CircleAvatar:** 사용자 프로필 이미지.
- **ProfileCard:** 사용자 프로필 요약 카드.
- **Streak:** 깃허브 잔디 스타일의 활동 기록 그래프.
- **Pagination:** 페이지 이동 네비게이션.
- **Calendar:** 월별 달력 뷰.

### Feedback
- **Dialog:** 모달 대화상자.
- **Tooltip:** 마우스 호버 시 나타나는 도움말.
- **CircularProgress:** 원형 진행률 표시기.

### Domain Specific (1D1S)
- **ChallengeCard:** 챌린지 정보를 보여주는 카드.
- **ChallengeListItem:** 챌린지 목록 아이템.
- **DiaryCard:** 일기/기록을 보여주는 카드.
- **UserListItem:** 사용자 목록 아이템.

## 🛠️ 개발 및 기여

### 로컬 실행 (Storybook)

```bash
# 의존성 설치
pnpm install

# 스토리북 실행 (http://localhost:6006)
pnpm storybook
```

### 빌드

```bash
# 스토리북 빌드 (Vercel 배포용)
pnpm build

# 라이브러리 빌드 (npm 배포용)
pnpm build:lib
```

## 📄 라이선스

MIT
