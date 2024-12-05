import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MenuElementT } from '@types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findElementById = (
  menuElements: MenuElementT[],
  id: string
): MenuElementT | null => {
  for (const el of menuElements) {
    if (el.id === id) {
      return el;
    }
    if (el.submenu) {
      const found = findElementById(el.submenu, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const findIndexById = (
  menuElements: MenuElementT[],
  id: string,
  path: (string | number)[] = []
): (string | number)[] | null => {
  for (let i = 0; i < menuElements.length; i++) {
    const el = menuElements[i];
    if (el.id === id) {
      return [...path, i];
    }
    if (el.submenu) {
      const foundPath = findIndexById(el.submenu, id, [...path, i]);
      if (foundPath) {
        return foundPath;
      }
    }
  }
  return null;
};

export const findElementByIndexPath = (
  menuElements: MenuElementT[],
  indexPath: number[]
): MenuElementT | null => {
  let current = menuElements;
  let element: MenuElementT | null = null;

  for (const index of indexPath) {
    if (!current || current[index] === undefined) {
      return null;
    }
    element = current[index];
    current = element.submenu || [];
  }

  return element;
};

export const updateElementById = (
  menuElements: MenuElementT[],
  id: string,
  data: MenuElementT
): MenuElementT[] => {
  return menuElements.map((el) => {
    if (el.id === id) {
      if (el.label !== data.label) el.label = data.label;
      if (data.url) el.url = data.url;

      return el;
    }
    if (el.submenu) {
      el.submenu = updateElementById(el.submenu, id, data);
    }
    return el;
  });
};
