import type { Meta, StoryObj } from '@storybook/react';
import { AddCircle } from './AddCircle';
import { Calendar } from './Calendar';
import { Check } from './Check';
import { Chevron } from './Chevron';
import { ChevronDown } from './ChevronDown';
import { ChevronLeft } from './ChevronLeft';
import { ChevronRight } from './ChevronRight';
import { ChevronUp } from './ChevronUp';
import { Close } from './Close';
import { Endless } from './Endless';
import { Eye } from './Eye';
import { EyeOff } from './EyeOff';
import { HamburgerMenu } from './HamburgerMenu';
import { Heart } from './Heart';
import { HeartFilled } from './HeartFilled';
import { Logo } from './Logo';
import { Minus } from './Minus';
import { People } from './People';
import { Person } from './Person';
import { Pin } from './Pin';
import { Plus } from './Plus';
import { Search } from './Search';

const icons = {
  AddCircle,
  Calendar,
  Check,
  Chevron,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Close,
  Endless,
  Eye,
  EyeOff,
  HamburgerMenu,
  Heart,
  HeartFilled,
  Logo,
  Minus,
  People,
  Person,
  Pin,
  Plus,
  Search,
};

const IconGallery = ({ size, color }: { size: number; color: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '24px',
      padding: '20px',
    }}
  >
    {Object.entries(icons).map(([name, Icon]) => (
      <div
        key={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e5e5e5',
        }}
      >
        <Icon width={size} height={size} style={{ color }} />
        <span style={{ fontSize: '12px', color: '#666' }}>{name}</span>
      </div>
    ))}
  </div>
);

const meta: Meta<typeof IconGallery> = {
  title: 'Icons/All Icons',
  component: IconGallery,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 64, step: 4 },
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconGallery>;

export const Gallery: Story = {
  args: {
    size: 24,
    color: '#000000',
  },
};
