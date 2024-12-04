'use client';
import { PlusIcon } from '@components/icons/PlusIcon';
import { Button } from '@components/ui/Button';

export default function Home() {
  return (
    <div className='grid items-center justify-center'>
      <Button onClick={() => console.log('clicked')}>
        <PlusIcon />
        Dodaj pozycję menu
      </Button>
    </div>
  );
}
