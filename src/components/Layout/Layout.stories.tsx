import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AppLayout,
  AppLayoutBody,
  AppLayoutHeader,
  AppLayoutOverlay,
  AppLayoutSidebar,
} from './Layout';

const meta: Meta = {
  title: 'Layout/AppLayout',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ── 공통 더미 UI ──────────────────────────────────────
function DummyHeader(): React.ReactElement {
  return (
    <div className="flex h-14 items-center justify-between rounded-xl bg-gray-200 px-4">
      <span className="text-sm font-bold text-gray-600">AppHeader 슬롯</span>
    </div>
  );
}

function DummySidebar(): React.ReactElement {
  return (
    <div className="flex h-64 w-69 flex-col items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-500">
      RightSidebar 슬롯
    </div>
  );
}

function DummyContent(): React.ReactElement {
  return (
    <div className="flex h-96 items-center justify-center rounded-2xl bg-gray-50 text-sm text-gray-500">
      페이지 콘텐츠
    </div>
  );
}

// ── Stories ───────────────────────────────────────────

export const WithSidebar: Story = {
  render: () => (
    <AppLayout>
      <AppLayoutHeader>
        <DummyHeader />
      </AppLayoutHeader>
      <AppLayoutBody
        sidebar={
          <AppLayoutSidebar stickyTop="top-28">
            <DummySidebar />
          </AppLayoutSidebar>
        }
      >
        <DummyContent />
      </AppLayoutBody>
    </AppLayout>
  ),
};

export const WithoutSidebar: Story = {
  render: () => (
    <AppLayout>
      <AppLayoutHeader>
        <DummyHeader />
      </AppLayoutHeader>
      <AppLayoutBody>
        <DummyContent />
      </AppLayoutBody>
    </AppLayout>
  ),
};

export const WithOverlay: Story = {
  render: () => (
    <AppLayout>
      <AppLayoutHeader>
        <DummyHeader />
      </AppLayoutHeader>
      <AppLayoutBody>
        <DummyContent />
      </AppLayoutBody>
      <AppLayoutOverlay open>
        <DummySidebar />
      </AppLayoutOverlay>
    </AppLayout>
  ),
};
