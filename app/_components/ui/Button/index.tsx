import { ButtonHTMLAttributes } from 'react';

import { ButtonVariant } from '@enums';
import { cn } from '@utils';

type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = ButtonVariant.Primary,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        `flex w-fit items-center gap-1 rounded-lg px-4 py-[9px] text-center text-sm font-semibold duration-100 active:ring-2 active:ring-violet-300`,
        {
          'button--primary': variant === ButtonVariant.Primary,
          'button--secondary': variant === ButtonVariant.Secondary,
          'button--tertiary': variant === ButtonVariant.Tertiary,
          'button--icon': variant === ButtonVariant.Icon,
        },
        className
      )}
      {...props}
    />
  );
}
