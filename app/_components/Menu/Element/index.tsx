'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import React, { useContext } from 'react';

import { MenuContext } from '@contexts/menu';
import { ButtonVariant } from '@enums';
import { GroupedButtonProps, MenuElementT } from '@types';

import { MenuElementView } from './MenuElementView';

type MenuElementProps = {
  menuElement: MenuElementT;
  index: number;
};

export function MenuElement({ menuElement, index }: MenuElementProps) {
  const { menuElements, setMenuElements, removeMenuElement } =
    useContext(MenuContext);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `menu-el-draggable_${menuElement.id}`,
    data: {
      menuElementIndex: index,
    },
  });
  const { setNodeRef: dropSetNodeRef } = useDroppable({
    id: `droppable_${menuElement.id}`,
  });

  const addMenuElement = () => {
    setMenuElements([
      ...menuElements,
      {
        id: menuElements.length,
        label: `menu element ${menuElements.length}`,
      } as MenuElementT,
    ]);
  };

  const groupedButtons: GroupedButtonProps = {
    id: menuElement.id,
    variant: ButtonVariant.Secondary,
    buttons: [
      {
        children: 'Usuń',
        onClick: () => removeMenuElement(menuElement.id),
      },
      {
        children: 'Edytuj',
        onClick: () => console.log('edytuj'),
      },
      {
        children: 'Dodaj pozycję menu',
        onClick: () => addMenuElement(),
      },
    ],
  };

  return (
    <MenuElementView
      menuElement={menuElement}
      groupedButtons={groupedButtons}
      setNodeRef={setNodeRef}
      dropSetNodeRef={dropSetNodeRef}
      listeners={listeners}
      attributes={attributes}
      className={index === menuElements.length - 1 ? 'border-b-0' : ''}
    />
  );
}
