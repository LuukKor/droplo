import { ButtonHTMLAttributes, ReactNode } from 'react';

import { ButtonVariant } from './enums';

export type WithChildren = {
  children: ReactNode;
};

export type MenuElementT = {
  id: string;
  label: string;
  url?: string;
  submenu?: MenuElementT[];
};

export type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type GroupedButtonProps = {
  id: string;
  variant: ButtonVariant;
  buttons: ButtonProps[];
};

export type MenuElementFormData = {
  name: string;
  link?: string;
};
