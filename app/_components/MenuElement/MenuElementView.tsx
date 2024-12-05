import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import React, { LegacyRef } from 'react';

import { GroupedButtons } from '@components/GroupedButtons';
import { MoveIcon } from '@components/icons/MoveIcon';
import { Button } from '@components/ui/Button';
import { ButtonVariant } from '@enums';
import { GroupedButtonProps, MenuElementT } from '@types';
import { cn } from '@utils';

type MenuElementViewProps = {
  menuElement: MenuElementT;
  groupedButtons?: GroupedButtonProps;
  setNodeRef?: LegacyRef<HTMLDivElement>;
  dropSetNodeRef?: LegacyRef<HTMLDivElement>;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
  className?: string;
};

export function MenuElementView({
  menuElement,
  groupedButtons = {
    id: `overlay_${menuElement.id}`,
    variant: ButtonVariant.Secondary,
    buttons: [
      {
        children: 'Usuń',
      },
      {
        children: 'Edytuj',
      },
      {
        children: 'Dodaj pozycję menu',
      },
    ],
  },
  setNodeRef,
  dropSetNodeRef,
  listeners,
  attributes,
  className = '',
}: MenuElementViewProps) {
  return (
    <div ref={dropSetNodeRef}>
      <div
        className={cn(
          'flex items-center gap-1 rounded-lg border-b border-gray-200 bg-white px-6 py-4',
          className
        )}
        ref={setNodeRef}
      >
        <Button variant={ButtonVariant.Icon} {...listeners} {...attributes}>
          <MoveIcon />
        </Button>
        <div className='flex flex-col gap-1 text-sm font-semibold text-gray-700'>
          {menuElement.label}
          {menuElement?.url && (
            <span className='font-normal text-gray-500'>{menuElement.url}</span>
          )}
        </div>
        <GroupedButtons
          id={groupedButtons.id}
          variant={groupedButtons.variant}
          buttons={groupedButtons.buttons}
        />
      </div>
    </div>
  );
}
