'use client';
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
    <button className={cn(`button button--${variant}`, className)} {...props} />
  );
}
