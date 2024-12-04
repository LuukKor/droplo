import { Dispatch, SetStateAction } from 'react';

import { PlusIcon } from '@components/icons/PlusIcon';
import { Button } from '@components/ui/Button';
import { MenuElement } from '@types';

type EmptyListProps = {
  setMenuElements: Dispatch<SetStateAction<MenuElement[]>>;
};

export const EmptyList = ({ setMenuElements }: EmptyListProps) => {
  return (
    <div className='mt-[30px] flex flex-col items-center justify-center rounded-lg bg-gray-50 p-6'>
      <h1 className='text-center text-base font-semibold text-gray-700'>
        Menu jest puste
      </h1>
      <p className='mt-1 text-center text-sm text-gray-500'>
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <Button
        onClick={() => setMenuElements([{ label: 'test', url: 'test.test' }])}
        className='mt-6'
      >
        <PlusIcon />
        Dodaj pozycję menu
      </Button>
    </div>
  );
};
