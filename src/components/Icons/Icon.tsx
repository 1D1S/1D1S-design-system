import React from "react";
import { AddCircle } from "./AddCircle";
import { Calendar } from "./Calendar";
import { Check } from "./Check";
import { Chevron } from "./Chevron";
import { ChevronDown } from "./ChevronDown";
import { ChevronLeft } from "./ChevronLeft";
import { ChevronRight } from "./ChevronRight";
import { ChevronUp } from "./ChevronUp";
import { Close } from "./Close";
import { Dumbbell } from "./Dumbbell";
import { Endless } from "./Endless";
import { Eye } from "./Eye";
import { EyeOff } from "./EyeOff";
import { Flag } from "./Flag";
import { Flame } from "./Flame";
import { HamburgerMenu } from "./HamburgerMenu";
import { Heart } from "./Heart";
import { HeartFilled } from "./HeartFilled";
import { Laptop } from "./Laptop";
import { Logo } from "./Logo";
import { Minus } from "./Minus";
import { People } from "./People";
import { Person } from "./Person";
import { Pin } from "./Pin";
import { Plus } from "./Plus";
import { Search } from "./Search";
import { Target } from "./Target";
import { Trophy } from "./Trophy";

const iconComponents = {
  AddCircle,
  Calendar,
  Check,
  Chevron,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Close,
  Dumbbell,
  Endless,
  Eye,
  EyeOff,
  Flag,
  Flame,
  HamburgerMenu,
  Heart,
  HeartFilled,
  Laptop,
  Logo,
  Minus,
  People,
  Person,
  Pin,
  Plus,
  Search,
  Target,
  Trophy,
} as const;

export type IconName = keyof typeof iconComponents;

export const ICON_NAMES = Object.keys(iconComponents) as IconName[];

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number | string;
}

/**
 * Icon
 * name 기반으로 프로젝트 아이콘을 렌더링하는 공통 아이콘 컴포넌트.
 */
export function Icon({
  name,
  size,
  width,
  height,
  ...props
}: IconProps): React.ReactElement {
  const IconComponent = iconComponents[name];
  const resolvedWidth = width ?? size;
  const resolvedHeight = height ?? size;

  return (
    <IconComponent
      width={resolvedWidth}
      height={resolvedHeight}
      {...props}
    />
  );
}
