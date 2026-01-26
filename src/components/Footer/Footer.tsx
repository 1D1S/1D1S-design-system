import { Text } from '../Text';
import { Logo } from '../Icons/Logo';

/**
 * Footer
 * 공통 하단 정보 영역 컴포넌트
 * - 로고 및 서비스명 표시
 * - 고객문의 이메일 제공
 * - 이용약관 / 개인정보처리방침 / 운영정책 링크 항목 포함
 */
export function Footer(): React.ReactElement {
  return (
    <footer className="flex w-screen items-center justify-center bg-gray-900 py-8 sm:pt-14 sm:pb-21.5">
      <div className="flex w-full max-w-250 flex-col gap-4 sm:gap-7.5 px-4 sm:px-7.5">
        <div className="flex flex-row items-center gap-3 sm:gap-5">
          <Logo width={24} height={40} className="text-white sm:w-[30px] sm:h-[50px]" />
          <Text size="heading2" weight="bold" className="text-white sm:text-3xl">
            1D1S
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Text size="caption1" weight="medium" className="text-white sm:text-lg">
            고객문의
          </Text>
          <Text size="caption1" weight="regular" className="text-white sm:text-lg">
            1d1s@gmail.com
          </Text>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-12.5">
          <Text size="caption1" weight="medium" className="text-white sm:text-lg">
            서비스 이용약관
          </Text>
          <Text size="caption1" weight="medium" className="text-white sm:text-lg">
            개인정보 처리방침
          </Text>
          <Text size="caption1" weight="medium" className="text-white sm:text-lg">
            운영정책
          </Text>
        </div>
      </div>
    </footer>
  );
}
