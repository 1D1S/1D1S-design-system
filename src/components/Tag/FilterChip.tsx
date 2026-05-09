import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const filterChipVariants = cva(
  "inline-flex items-center justify-center rounded-full border font-bold whitespace-nowrap " +
    "transition-[background-color,border-color,color] duration-150 ease-out " +
    "active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-[0.45] disabled:active:scale-100 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "text-[11px] py-1.5 px-3",
        md: "text-xs py-[7px] px-3.5",
        lg: "text-sm py-2 px-4",
      },
      active: {
        true: "bg-brand text-white border-brand",
        false: "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  },
);

export interface FilterChipProps
  extends Omit<React.ComponentProps<"button">, "size">,
    VariantProps<typeof filterChipVariants> {
  children: React.ReactNode;
}

/**
 * FilterChip
 * 카테고리 필터 / 토글 칩 — 클릭 가능한 button 요소.
 *
 * @param active 선택 상태 (default `false`)
 * @param size `sm` · `md` (default) · `lg`
 *
 * @example
 * ```tsx
 * const [cat, setCat] = useState('전체');
 * {categories.map((c) => (
 *   <FilterChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</FilterChip>
 * ))}
 * ```
 */
export function FilterChip({
  className,
  size,
  active,
  children,
  type = "button",
  ...props
}: FilterChipProps): React.ReactElement {
  return (
    <button
      data-slot="filter-chip"
      type={type}
      data-active={active ? "true" : "false"}
      aria-pressed={active ?? false}
      className={cn(filterChipVariants({ size, active, className }))}
      {...props}
    >
      {children}
    </button>
  );
}
