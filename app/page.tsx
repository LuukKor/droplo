'use client';
import { PlusIcon } from '@components/icons/PlusIcon';
import { Button } from '@components/ui/Button';

import { ButtonVariant } from './_types/enums';

export default function Home() {
  return (
    <div className='grid items-center justify-center'>
      <Button onClick={() => console.log('clicked')}>
        <PlusIcon />
        Dodaj pozycję menu
      </Button>
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => console.log('clicked')}
      >
        Anuluj
      </Button>
      <Button
        variant={ButtonVariant.Tertiary}
        onClick={() => console.log('clicked')}
      >
        Dodaj
      </Button>
      <Button
        variant={ButtonVariant.Icon}
        onClick={() => console.log('clicked')}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
