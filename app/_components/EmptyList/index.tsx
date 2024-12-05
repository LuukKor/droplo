import { Button } from '@components/ui/Button';
import { PlusIcon } from '@components/ui/Icons/PlusIcon';

type EmptyListProps = {
  id: string;
  openForm: (id: string) => void;
};

export const EmptyList = ({ id, openForm }: EmptyListProps) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg bg-gray-50 p-6'>
      <h1 className='text-center text-base font-semibold text-gray-700'>
        Menu jest puste
      </h1>
      <p className='mt-1 text-center text-sm text-gray-500'>
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <Button onClick={() => openForm(id)} className='mt-6'>
        <PlusIcon />
        Dodaj pozycję menu
      </Button>
    </div>
  );
};
