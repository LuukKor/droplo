import { Dispatch, SetStateAction } from 'react';

import { PlusIcon } from '@components/Icons/PlusIcon';
import { Button } from '@components/ui/Button';
import { MenuElementT } from '@types';

type EmptyListProps = {
  setMenuElements: Dispatch<SetStateAction<MenuElementT[]>>;
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
        onClick={() =>
          setMenuElements([
            { id: 0, label: 'test', url: 'test.test' },
            { id: 1, label: 'test2', url: 'test2.test2' },
          ])
        }
        className='mt-6'
      >
        <PlusIcon />
        Dodaj pozycję menu
      </Button>
    </div>
  );
};
