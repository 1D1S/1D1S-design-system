import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Feedback/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>챌린지란 무엇인가요?</AccordionTrigger>
        <AccordionContent>
          챌린지는 특정 기간 동안 목표를 달성하기 위해 참여하는 활동입니다.
          다른 사용자들과 함께 도전하며 동기부여를 받을 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>참여 방법이 궁금해요</AccordionTrigger>
        <AccordionContent>
          원하는 챌린지를 선택하고 참여하기 버튼을 누르면 됩니다.
          매일 인증을 통해 진행 상황을 기록할 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>보상은 어떻게 받나요?</AccordionTrigger>
        <AccordionContent>
          챌린지를 성공적으로 완료하면 배지와 포인트를 획득할 수 있습니다.
          포인트는 다양한 혜택으로 교환 가능합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>서비스 이용약관</AccordionTrigger>
        <AccordionContent>
          서비스 이용약관에 대한 자세한 내용입니다.
          이 서비스를 이용함으로써 약관에 동의하게 됩니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>개인정보 처리방침</AccordionTrigger>
        <AccordionContent>
          개인정보 처리방침에 대한 자세한 내용입니다.
          수집하는 정보와 사용 목적을 안내드립니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>환불 정책</AccordionTrigger>
        <AccordionContent>
          환불 정책에 대한 자세한 내용입니다.
          구매 후 7일 이내 환불 가능합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>기본으로 열려있는 항목</AccordionTrigger>
        <AccordionContent>
          이 항목은 처음부터 열려있는 상태입니다.
          defaultValue prop으로 설정할 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>두 번째 항목</AccordionTrigger>
        <AccordionContent>
          이 항목은 클릭해서 열어야 합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
