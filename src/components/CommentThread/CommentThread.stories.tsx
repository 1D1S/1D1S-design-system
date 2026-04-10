import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommentThread, type CommentNode } from "./CommentThread";

const comments: CommentNode[] = [
  {
    id: "c-1",
    content: "오늘 챌린지 너무 좋네요. 덕분에 아침 루틴이 잡혔어요!",
    createdAt: "2026.04.10",
    author: {
      id: "user-1",
      nickname: "러닝하는지민",
      profileImageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    replies: [
      {
        id: "c-1-r-1",
        content: "공감해요. 저는 저녁 루틴으로 바꿔서 하고 있어요.",
        createdAt: "2026.04.10",
        author: {
          id: "user-2",
          nickname: "야근러민수",
          profileImageUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        },
      },
      {
        id: "c-1-r-2",
        content: "좋은 흐름이네요! 같이 오래 가봐요.",
        createdAt: "2026.04.10",
        author: {
          id: "user-1",
          nickname: "러닝하는지민",
          profileImageUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        },
      },
    ],
  },
  {
    id: "c-2",
    content: "혹시 주말에는 인증 시간 조금 유연하게 해주실 수 있을까요?",
    createdAt: "2026.04.09",
    author: {
      id: "user-3",
      nickname: "주말전사",
      profileImageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  },
];

const meta: Meta<typeof CommentThread> = {
  title: "Community/CommentThread",
  component: CommentThread,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-white p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onEdit: { action: "edit clicked" },
    onDelete: { action: "delete clicked" },
    onReport: { action: "report clicked" },
    onReplySubmit: { action: "reply submitted" },
  },
};

export default meta;
type Story = StoryObj<typeof CommentThread>;

export const Default: Story = {
  args: {
    comments,
    currentUserId: "user-1",
  },
};

export const Empty: Story = {
  args: {
    comments: [],
  },
};

export const LongContent: Story = {
  args: {
    currentUserId: "user-1",
    comments: [
      {
        id: "long-1",
        createdAt: "2026.04.10",
        author: {
          id: "user-1",
          nickname: "러닝하는지민",
          profileImageUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        },
        content:
          "이번 챌린지를 하면서 느낀 점을 길게 남겨봐요. 처음에는 사소한 목표라고 생각했는데, 매일 같은 시간에 기록하고 인증하는 루틴이 쌓이니까 생활 전체 리듬이 안정되는 게 보이더라고요. 특히 집중이 안 되던 날에도 짧게라도 해내면 다음 날 시작할 때 심리적 부담이 줄어들어서 꾸준함에 큰 도움이 됐어요. 비슷한 고민이 있는 분들은 완벽하게 하려 하기보다 작게라도 이어가는 방식으로 함께 가보면 좋겠습니다.",
        replies: [
          {
            id: "long-1-r-1",
            createdAt: "2026.04.10",
            author: {
              id: "user-2",
              nickname: "야근러민수",
              profileImageUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            },
            content:
              "긴 후기 너무 공감돼요. 저도 처음에는 며칠 하다 말겠지 싶었는데, 체크리스트로 남겨두고 나중에 돌아보니까 패턴이 보이더라고요. 아예 못 한 날보다 조금이라도 실행한 날이 훨씬 많았다는 사실이 동기부여가 돼서 계속 이어가고 있습니다.",
          },
        ],
      },
    ],
  },
};

export const ManyReplies: Story = {
  args: {
    currentUserId: "user-1",
    comments: [
      {
        id: "many-1",
        createdAt: "2026.04.10",
        author: {
          id: "user-1",
          nickname: "러닝하는지민",
          profileImageUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        },
        content: "대댓글이 많은 케이스 테스트입니다.",
        replies: Array.from({ length: 8 }).map((_, index) => ({
          id: `many-1-r-${index + 1}`,
          createdAt: "2026.04.10",
          author: {
            id: `user-r-${index + 1}`,
            nickname: `참여자${index + 1}`,
            profileImageUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
          },
          content: `대댓글 ${index + 1}번 내용입니다.`,
        })),
      },
    ],
  },
};
