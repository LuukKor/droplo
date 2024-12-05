'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import React from 'react';

import { MenuElementT } from '@types';

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
  const droppable = useDroppable({
    id: `droppable_${menuElement.id}`,
  });

  return (
    <div className='droppable bg-slate-300 p-4' ref={droppable.setNodeRef}>
      <div
        className='bg-red-200'
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        {menuElement.label}
        {menuElement?.url && <small>{menuElement.url}</small>}
      </div>
    </div>
  );
}
