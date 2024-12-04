import { ReactNode } from 'react';

export type WithChildren = {
  children: ReactNode;
};

export type MenuElementT = {
  id: number;
  label: string;
  url?: string;
  submenu?: MenuElementT[];
};
