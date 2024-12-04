'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import { MenuElementT } from '@types';

type MenuElementProps = {
  menuElement: MenuElementT;
  menuElements: MenuElementT[];
};

export function MenuElement({ menuElement }: MenuElementProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `menu-el-draggable_${menuElement.id}`,
    data: {
      menuElementId: menuElement.id,
    },
  });
  const droppable = useDroppable({
    id: `droppable_${menuElement.id}`,
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div className='droppable bg-slate-300 p-4' ref={droppable.setNodeRef}>
      <div
        className='bg-red-200'
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {menuElement.label}
        {menuElement?.url && <small>{menuElement.url}</small>}
      </div>
    </div>
  );
}
