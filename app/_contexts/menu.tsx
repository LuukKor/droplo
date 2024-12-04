'use client';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { MenuElementT, WithChildren } from '@types';

type MenuContextProps = {
  menuElements: MenuElementT[];
  setMenuElements: Dispatch<SetStateAction<MenuElementT[]>>;
};

export const MenuContext = createContext<MenuContextProps>({
  menuElements: [],
  setMenuElements: () => {},
});

function swapIndex(array: MenuElementT[], index1: number, index2: number) {
  if (
    index1 < 0 ||
    index1 >= array.length ||
    index2 < 0 ||
    index2 >= array.length
  ) {
    return array;
  }

  [array[index1], array[index2]] = [array[index2], array[index1]];

  return array;
}

export function MenuContextProvider({ children }: WithChildren) {
  const [menuElements, setMenuElements] = useState<MenuElementT[]>([]);

  const handleDragEnd = ({ active: { id: activeId }, over }: DragEndEvent) => {
    const endId = over?.id;

    if (!endId) {
      return;
    }

    if (typeof activeId !== 'string' || typeof endId !== 'string') return;

    const startIdNum = parseInt(activeId.split('_')[1]);
    const endIdNum = parseInt(endId.split('_')[1]);
    const menuElPrevPosition = menuElements.findIndex(
      (el) => el.id === startIdNum
    );
    const menuElNextPosition = menuElements.findIndex(
      (el) => el.id === endIdNum
    );

    if (menuElPrevPosition < 0 || menuElNextPosition < 0) return;

    const menuElementsNewPositions = swapIndex(
      menuElements,
      menuElPrevPosition,
      menuElNextPosition
    );

    setMenuElements([...menuElementsNewPositions]);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <MenuContext.Provider value={{ menuElements, setMenuElements }}>
        {children}
      </MenuContext.Provider>
    </DndContext>
  );
}
