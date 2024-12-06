'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import React, { useContext } from 'react';

import { MenuContext } from '@contexts/menu';
import { ButtonVariant } from '@enums';
import { GroupedButtonProps, MenuElementT } from '@types';

import { MenuElementView } from './MenuElementView';

type MenuElementProps = {
  menuElement: MenuElementT;
};

export function MenuElement({ menuElement }: MenuElementProps) {
  const { removeMenuElement, editMenuElement, addToSubMenu } =
    useContext(MenuContext);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `menu-el-draggable_${menuElement.id}`,
    data: {
      menuElementId: menuElement.id,
    },
  });
  const { setNodeRef: dropSetNodeRef } = useDroppable({
    id: `droppable_${menuElement.id}`,
  });

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
        onClick: () => editMenuElement(menuElement.id),
      },
      {
        children: 'Dodaj pozycję menu',
        onClick: () => addToSubMenu(menuElement.id),
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
    />
  );
}
