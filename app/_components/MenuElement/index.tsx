'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import React from 'react';

import { MenuElementT } from '@types';

import { MenuElementView } from './MenuElementView';

type MenuElementProps = {
  menuElement: MenuElementT;
  index: number;
};

export function MenuElement({ menuElement, index }: MenuElementProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `menu-el-draggable_${menuElement.id}`,
    data: {
      menuElementIndex: index,
    },
  });
  const { setNodeRef: dropSetNodeRef } = useDroppable({
    id: `droppable_${menuElement.id}`,
  });

  return (
    <MenuElementView
      menuElement={menuElement}
      setNodeRef={setNodeRef}
      dropSetNodeRef={dropSetNodeRef}
      listeners={listeners}
      attributes={attributes}
    />
  );
}
