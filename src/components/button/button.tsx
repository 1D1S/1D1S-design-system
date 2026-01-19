import { cn } from '../../lib/utils';
import { buttonVariants } from '../ui/button';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Label } from '../label';

const allButtonVariants = 'h-auto border-none shadow-none cursor-pointer flex items-center justify-center';

const customButtonVariants = cva(allButtonVariants, {
  variants: {
    variant: {
      default: 'bg-main-900 text-white hover:bg-main-800',
      disabled: 'bg-gray-400 text-gray-600 cursor-not-allowed',
      warning: 'bg-warning text-white',
      loading: 'bg-main-900 opacity-80 cursor-wait',
      outline: 'text-gray-900 hover:bg-main-900 hover:text-white inset-ring-[1.5px] inset-ring-main-900 bg-transparent',
    },
    size: {
      lg: 'rounded-2 py-4 px-6',
      md: 'rounded-1.5 py-2.5 px-5',
      sm: 'rounded-1 py-1.5 px-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'lg',
  },
});

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof customButtonVariants> {
  asChild?: boolean;
}

/**
 * Button
 * 커스텀 버튼 컴포넌트
 * @param variant 버튼스타일 : default, disabled, warning, loading, outline
 * @param size 버튼 크기 : lg, md, sm
 *
 * @example 기본 버튼
 * ```tsx
 * <Button variant="default" size="lg">Large Button</Button>
 * ```
 */
export function Button({
  className,
  variant = 'default',
  size = 'lg',
  asChild = false,
  disabled = false,
  ...props
}: ButtonProps): React.ReactElement {
  const Comp = asChild ? Slot : 'button';
  
  const labelSizeMap = {
    lg: 'body1',
    md: 'body2',
    sm: 'caption3',
  } as const;

  return (
    <Comp
      data-slot="button"
      className={cn(customButtonVariants({ variant: disabled ? 'disabled' : variant, size, className }))}
      disabled={disabled}
      {...props}
    >
      <Label size={labelSizeMap[size || 'lg']} weight={disabled ? 'regular' : 'bold'}>
        {props.children}
      </Label>
    </Comp>
  );
}