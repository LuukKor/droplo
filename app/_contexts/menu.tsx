'use client';

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { MenuElementView } from '@components/Menu/Element/MenuElementView';
import { MenuElementFormData, MenuElementT, WithChildren } from '@types';
import {
  findElementById,
  findIndexById,
  removeElementById,
  swapElementsByIndexPath,
  updateElementById,
} from '@utils';

type MenuContextProps = {
  menuElements: MenuElementT[];
  setMenuElements: Dispatch<SetStateAction<MenuElementT[]>>;
  formIsOpen: boolean;
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
  removeMenuElement: (id: string) => void;
  editMenuElement: (id: string) => void;
  addToSubMenu: (id: string) => void;
  handleMenuElementFormSubmit: (id: string, data: MenuElementFormData) => void;
  activeID: string;
  setActiveID: Dispatch<SetStateAction<string>>;
  isAddToSubmenu: boolean;
};

export const MenuContext = createContext<MenuContextProps>({
  menuElements: [],
  setMenuElements: () => {},
  formIsOpen: false,
  setFormIsOpen: () => {},
  removeMenuElement: () => {},
  editMenuElement: () => {},
  addToSubMenu: () => {},
  handleMenuElementFormSubmit: () => {},
  activeID: '',
  setActiveID: () => {},
  isAddToSubmenu: false,
});

export function MenuContextProvider({ children }: WithChildren) {
  const [menuElements, setMenuElements] = useState<MenuElementT[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [activeID, setActiveID] = useState(crypto.randomUUID());
  const [isAddToSubmenu, setIsAddToSubmenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDragStart = ({ active }: DragEndEvent) => {
    const menuElementId = active.data.current?.menuElementId;
    if (menuElementId) setActiveID(active.data.current?.menuElementId);
  };

  const handleDragEnd = ({ active: { id: activeId }, over }: DragEndEvent) => {
    const endId = over?.id;

    if (typeof activeId !== 'string' || typeof endId !== 'string') return;

    const splitedStartId = activeId.split('_')[1];
    const splitedEndId = endId.split('_')[1];

    if (splitedStartId === splitedEndId) return;

    const menuElPrevPosition = findIndexById(menuElements, splitedStartId);
    const menuElNextPosition = findIndexById(menuElements, splitedEndId);

    if (menuElNextPosition === null || menuElPrevPosition === null) return;

    const array = JSON.parse(JSON.stringify(menuElements));

    const newArray = swapElementsByIndexPath(
      array,
      menuElPrevPosition,
      menuElNextPosition
    );

    setMenuElements(newArray);
    setActiveID('');
  };

  const removeMenuElement = (id: string) => {
    if (confirm(`Chcesz usunąć element z listy?`) == false) {
      return;
    }
    const array = JSON.parse(JSON.stringify(menuElements));
    const newArray = removeElementById(array, id);

    setMenuElements(newArray);
    setFormIsOpen(false);
    setActiveID('');
    setIsEdit(false);
    setIsAddToSubmenu(false);
  };

  const editMenuElement = (id: string) => {
    setActiveID(id);
    setFormIsOpen(true);
    setIsEdit(true);
    setIsAddToSubmenu(false);
  };

  const addToSubMenu = (id: string) => {
    setActiveID(id);
    setFormIsOpen(true);
    setIsEdit(false);
    setIsAddToSubmenu(true);
  };

  const handleMenuElementFormSubmit = (
    id: string,
    data: MenuElementFormData
  ) => {
    if (isAddToSubmenu) {
      const array = JSON.parse(JSON.stringify(menuElements));

      const dataToSave = {
        id: crypto.randomUUID(),
        label: data.name,
        url: data.link,
        submenu: [],
      };

      const newArray = updateElementById(array, activeID, dataToSave, true);

      if (newArray) {
        setMenuElements([...newArray]);
      }
    } else if (isEdit) {
      const array = JSON.parse(JSON.stringify(menuElements));
      const element = findElementById(menuElements, id);

      const dataToSave = {
        id: id,
        label: data.name,
        url: data.link,
        submenu: element ? element.submenu : [],
      };

      const newArray = updateElementById(array, activeID, dataToSave);

      if (newArray) {
        setMenuElements([...newArray]);
      }
    } else {
      setMenuElements([
        ...menuElements,
        { id: id, label: data.name, url: data.link, submenu: [] },
      ]);
    }
    setFormIsOpen(false);
    setIsAddToSubmenu(false);
    setIsEdit(false);
    setActiveID('');
  };
  const activeElement = findElementById(menuElements, activeID);

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
          addToSubMenu,
          isAddToSubmenu,
        }}
      >
        {children}
      </MenuContext.Provider>

      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeElement ? <MenuElementView menuElement={activeElement} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
