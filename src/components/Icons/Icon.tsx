import React from "react";
import { AddCircle } from "./AddCircle";
import { Bell } from "./Bell";
import { BookOpen } from "./BookOpen";
import { Calendar } from "./Calendar";
import { Check } from "./Check";
import { Code2 } from "./Code2";
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
import { LogIn } from "./LogIn";
import { Logo } from "./Logo";
import { Minus } from "./Minus";
import { Palette } from "./Palette";
import { People } from "./People";
import { PencilLine } from "./PencilLine";
import { Person } from "./Person";
import { Pin } from "./Pin";
import { Plane } from "./Plane";
import { Plus } from "./Plus";
import { Salad } from "./Salad";
import { Search } from "./Search";
import { Settings } from "./Settings";
import { Target } from "./Target";
import { Trophy } from "./Trophy";

const iconComponents = {
  AddCircle,
  Bell,
  BookOpen,
  Calendar,
  Check,
  Code2,
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
  LogIn,
  Logo,
  Minus,
  Palette,
  People,
  PencilLine,
  Person,
  Pin,
  Plane,
  Plus,
  Salad,
  Search,
  Settings,
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
