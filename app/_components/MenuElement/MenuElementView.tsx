import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import React, { LegacyRef } from 'react';

import { MoveIcon } from '@components/icons/MoveIcon';
import { Button } from '@components/ui/Button';
import { ButtonVariant } from '@enums';
import { MenuElementT } from '@types';

type MenuElementViewProps = {
  menuElement: MenuElementT;
  setNodeRef?: LegacyRef<HTMLDivElement>;
  dropSetNodeRef?: LegacyRef<HTMLDivElement>;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
};

export function MenuElementView({
  menuElement,
  setNodeRef,
  dropSetNodeRef,
  listeners,
  attributes,
}: MenuElementViewProps) {
  return (
    <div ref={dropSetNodeRef}>
      <div
        className='flex items-center gap-1 rounded-lg border-b border-gray-200 bg-white px-6 py-4'
        ref={setNodeRef}
      >
        <Button variant={ButtonVariant.Icon} {...listeners} {...attributes}>
          <MoveIcon />
        </Button>
        <div className='flex flex-col gap-2 text-sm text-gray-700'>
          {menuElement.label}
          {menuElement?.url && (
            <span className='text-gray-500'>{menuElement.url}</span>
          )}
        </div>
      </div>
    </div>
  );
}
