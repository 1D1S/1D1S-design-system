import type { Meta, StoryObj } from "@storybook/react";
import { BannerCarousel } from "./BannerCarousel";

const meta: Meta<typeof BannerCarousel> = {
  title: "BannerCarousel",
  component: BannerCarousel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BannerCarousel>;

const demoItems = [
  {
    id: "1",
    type: "이번 주 추천",
    title: "지금 인기 챌린지 보러가기",
    subtitle: "가장 많이 참여 중인 챌린지를 확인해보세요.",
    backgroundImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "2",
    type: "커뮤니티 인기",
    title: "오늘의 커뮤니티 일지 보기",
    subtitle: "이미지가 없으면 기본 주황 그라데이션이 표시됩니다.",
  },
  {
    id: "3",
    type: "빠른 시작",
    title: "새 챌린지 만들기",
    subtitle: "지금 바로 목표를 정하고 챌린지를 시작해보세요.",
    backgroundImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80",
  },
];

export const Default: Story = {
  args: {
    items: demoItems,
    componentId: "home-main-banner",
  },
};

export const ImageBackground: Story = {
  args: {
    items: [
      {
        id: "img-1",
        type: "사진 배경",
        title: "사진 중심 배너",
        subtitle: "이미지가 있으면 배경 이미지가 노출됩니다.",
        backgroundImageUrl:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "img-2",
        type: "기본 배경",
        title: "기본 주황 그라데이션 배너",
        subtitle: "이미지가 없으면 기본 그라데이션이 노출됩니다.",
      },
      {
        id: "img-3",
        type: "사진 배경",
        title: "배경 이미지 배너",
        subtitle: "이미지 + 텍스트 대비를 위해 어두운 오버레이가 적용됩니다.",
        backgroundImageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  },
};

export const NoAutoSlide: Story = {
  args: {
    items: demoItems,
    autoSlideIntervalMs: 0,
  },
};

export const NoIndicators: Story = {
  args: {
    items: demoItems,
    showIndicators: false,
  },
};
