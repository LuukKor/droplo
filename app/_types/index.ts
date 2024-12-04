import { ReactNode } from 'react';

export type WithChildren = {
  children: ReactNode;
};

export type MenuElement = {
  label: string;
  url?: string;
};
