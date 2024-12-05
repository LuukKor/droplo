import { ButtonHTMLAttributes, ReactNode } from 'react';

import { ButtonVariant } from './enums';

export type WithChildren = {
  children: ReactNode;
};

export type MenuElementT = {
  id: number;
  label: string;
  url?: string;
  submenu?: MenuElementT[];
};

export type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type GroupedButtonProps = {
  id: string | number;
  variant: ButtonVariant;
  buttons: ButtonProps[];
};
