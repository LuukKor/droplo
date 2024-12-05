'use client';

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { MenuElementView } from '@components/Menu/Element/MenuElementView';
import { MenuElementFormData, MenuElementT, WithChildren } from '@types';

type MenuContextProps = {
  menuElements: MenuElementT[];
  setMenuElements: Dispatch<SetStateAction<MenuElementT[]>>;
  formIsOpen: boolean;
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
  removeMenuElement: (id: string) => void;
  editMenuElement: (id: string) => void;
  handleMenuElementFormSubmit: (
    id: string,
    data: MenuElementFormData,
    isEdit: boolean
  ) => void;
  activeID: string;
  setActiveID: Dispatch<SetStateAction<string>>;
};

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

export const MenuContext = createContext<MenuContextProps>({
  menuElements: [],
  setMenuElements: () => {},
  formIsOpen: false,
  setFormIsOpen: () => {},
  removeMenuElement: () => {},
  editMenuElement: () => {},
  handleMenuElementFormSubmit: () => {},
  activeID: '',
  setActiveID: () => {},
});

export function MenuContextProvider({ children }: WithChildren) {
  const [menuElements, setMenuElements] = useState<MenuElementT[]>([
    {
      id: 'first',
      label: 'test',
      submenu: [
        {
          id: 'first-child',
          label: 'test child',
          submenu: [
            {
              id: 'first-child-child',
              label: 'test child child',
              submenu: [],
            },
          ],
        },
      ],
    },
  ]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeID, setActiveID] = useState('first');

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

    const splitedStartId = activeId.split('_')[1];
    const splitedEndId = endId.split('_')[1];

    const menuElPrevPosition = menuElements.findIndex((el) => {
      return el.id === splitedStartId;
    });
    const menuElNextPosition = menuElements.findIndex((el) => {
      return el.id === splitedEndId;
    });

    if (menuElPrevPosition < 0 || menuElNextPosition < 0) return;

    const menuElementsNewPositions = swapIndex(
      menuElements,
      menuElPrevPosition,
      menuElNextPosition
    );

    setMenuElements(menuElementsNewPositions);
    setActiveIndex(null);
  };

  const removeMenuElement = (id: string) => {
    confirm(`Chcesz usunąć element z listy?`);

    const index = menuElements.findIndex((el: MenuElementT) => el.id === id);

    if (index > -1) {
      const newMenuElements = menuElements.toSpliced(index, 1);

      setMenuElements(newMenuElements);
      setFormIsOpen(false);
      setActiveID('');
    }
  };

  const editMenuElement = (id: string) => {
    setActiveID(id);
    setFormIsOpen(true);
  };

  const handleMenuElementFormSubmit = (
    id: string,
    data: MenuElementFormData,
    isEdit: boolean
  ) => {
    if (isEdit) {
      const array = menuElements;
      const index = array.findIndex((el: MenuElementT) => el.id === id);

      array[index] = {
        id: id,
        label: data.name,
        url: data.link,
        submenu: array[index].submenu,
      };

      setMenuElements([...array]);
    } else {
      setMenuElements([
        ...menuElements,
        { id: id, label: data.name, url: data.link, submenu: [] },
      ]);
    }
    setFormIsOpen(false);
    setActiveID('');
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
          activeID,
          setActiveID,
          editMenuElement,
          handleMenuElementFormSubmit,
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
