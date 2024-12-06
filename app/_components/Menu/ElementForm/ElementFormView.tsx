import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { Button } from '@components/ui/Button';
import { SearchIcon } from '@components/ui/Icons/SearchIcon';
import { TrashIcon } from '@components/ui/Icons/TrashIcon';
import { Input } from '@components/ui/Input';
import { ButtonVariant } from '@enums';
import { MenuElementT } from '@types';

type MenuElementFormData = {
  name: string;
  link?: string;
};

type MenuElementFormViewProps = {
  id: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<MenuElementFormData>;
  errors: FieldErrors<FieldValues>;
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
  trashIconButtonHandle: ((id: string) => void) | false;
  defaultValue: MenuElementT;
};

export function ElementFormView({
  id,
  handleSubmit,
  register,
  errors,
  setFormIsOpen,
  trashIconButtonHandle,
  defaultValue,
}: MenuElementFormViewProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex gap-3 rounded-lg border border-gray-300 px-6 py-5'
    >
      <div className='w-full'>
        <div className='mb-2'>
          <Input
            id='name'
            label='Nazwa'
            placeholder={'np. Promocje'}
            defaultValue={defaultValue?.label}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className='text-red-500'>To pole jest wymagane</span>
          )}
        </div>
        <div className='mb-5'>
          <Input
            id='link'
            label='Link'
            placeholder={'Wklej lub wyszukaj'}
            defaultValue={defaultValue?.url}
            icon={<SearchIcon />}
            {...register('link')}
          />
        </div>
        <div className='flex gap-2'>
          <Button
            onClick={() => setFormIsOpen(false)}
            type='button'
            variant={ButtonVariant.Secondary}
          >
            Anuluj
          </Button>
          <Button type='submit' variant={ButtonVariant.Tertiary}>
            Dodaj
          </Button>
        </div>
      </div>
      <Button
        onClick={() =>
          trashIconButtonHandle
            ? trashIconButtonHandle(id)
            : setFormIsOpen(false)
        }
        type='button'
        variant={ButtonVariant.Icon}
        className='ml-2 self-start'
      >
        <TrashIcon />
      </Button>
    </form>
  );
}
