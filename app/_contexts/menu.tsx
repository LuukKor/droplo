'use client';

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { MenuElementView } from '@components/Menu/Element/MenuElementView';
import { MenuElementT, WithChildren } from '@types';

type MenuContextProps = {
  menuElements: MenuElementT[];
  setMenuElements: Dispatch<SetStateAction<MenuElementT[]>>;
  formIsOpen: boolean;
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
  removeMenuElement: (id: string | number) => void;
};

export const MenuContext = createContext<MenuContextProps>({
  menuElements: [],
  setMenuElements: () => {},
  formIsOpen: false,
  setFormIsOpen: () => {},
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
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleDragStart = ({ active }: DragEndEvent) => {
    const activeIndex = active.data.current?.menuElementIndex;
    if (typeof activeIndex === 'number')
      setActiveIndex(active.data.current?.menuElementIndex);
  };

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
    setActiveIndex(null);
  };

  const removeMenuElement = (id: number) => {
    confirm(`Chcesz usunąć element z listy?`);

    const index = menuElements.findIndex((el: MenuElementT) => el.id === id);

    if (index > -1) {
      const newMenuElements = menuElements.toSpliced(index, 1);

      setMenuElements([...newMenuElements]);
    }
  };

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <MenuContext.Provider
        value={{
          menuElements,
          setMenuElements,
          formIsOpen,
          setFormIsOpen,
          removeMenuElement,
        }}
      >
        {children}
      </MenuContext.Provider>

      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {typeof activeIndex === 'number' ? (
          <MenuElementView menuElement={menuElements[activeIndex]} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
