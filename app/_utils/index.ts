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
  path: number[] = []
): number[] | null => {
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

export function swapElementsByIndexPath(
  menuElements: MenuElementT[],
  path1: number[],
  path2: number[]
): MenuElementT[] {
  const getNodeByPath = (
    menuElements: MenuElementT[],
    path: number[]
  ): MenuElementT => {
    return path.reduce(
      (el: MenuElementT, index: number) => {
        return el.submenu[index];
      },
      { submenu: menuElements } as MenuElementT
    );
  };

  const el1 = getNodeByPath(menuElements, path1);
  const el2 = getNodeByPath(menuElements, path2);

  [el1.id, el2.id] = [el2.id, el1.id];
  [el1.label, el2.label] = [el2.label, el1.label];

  return menuElements;
}

export const updateElementById = (
  menuElements: MenuElementT[],
  id: string,
  data: MenuElementT,
  forSubmenu: boolean = false
): MenuElementT[] => {
  return menuElements.map((el) => {
    if (el.id === id) {
      if (forSubmenu) {
        el.submenu.push(data);
      } else {
        if (el.label !== data.label) el.label = data.label;
        if (data.url) el.url = data.url;
      }

      return el;
    }
    if (el.submenu) {
      el.submenu = updateElementById(el.submenu, id, data, forSubmenu);
    }
    return el;
  });
};

export const removeElementById = (
  menuElements: MenuElementT[],
  id: string
): MenuElementT[] => {
  return menuElements.reduce((acc: MenuElementT[], el: MenuElementT) => {
    if (el.id === id) {
      if (el.submenu && el.submenu.length > 0) {
        acc.push(...el.submenu);
      }
    } else {
      const updatedElement = { ...el };
      if (el.submenu) {
        updatedElement.submenu = removeElementById(el.submenu, id);
      }
      acc.push(updatedElement);
    }
    return acc;
  }, []);
};
