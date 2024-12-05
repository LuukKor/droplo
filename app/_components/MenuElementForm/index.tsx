'use client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@components/ui/Button';
import { SearchIcon } from '@components/ui/Icons/SearchIcon';
import { TrashIcon } from '@components/ui/Icons/TrashIcon';
import { Input } from '@components/ui/Input';
import { MenuContext } from '@contexts/menu';
import { ButtonVariant } from '@enums';

type MenuElementFormData = {
  name: string;
  link?: string;
};

export function MenuElementForm({ id }) {
  const { menuElements, setMenuElements, setFormIsOpen } =
    useContext(MenuContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: MenuElementFormData) => {
    console.log(data);

    setMenuElements([
      ...menuElements,
      { id: id, label: data.name, url: data.link },
    ]);
    setFormIsOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex gap-3 rounded-lg border border-gray-300 px-6 py-5'
    >
      <div className='w-full'>
        <div className='mb-2'>
          <Input
            id='name'
            label='Nazwa'
            placeholder={'np. Promocje'}
            {...register('name', { required: true })}
          />
          {errors.link && (
            <span className='text-red-500'>To pole jest wymagane</span>
          )}
        </div>
        <div className='mb-5'>
          <Input
            id='link'
            label='Link'
            placeholder={'Wklej lub wyszukaj'}
            icon={<SearchIcon />}
            {...register('link')}
          />
        </div>
        <div className='flex gap-2'>
          <Button type='button' variant={ButtonVariant.Secondary}>
            Anuluj
          </Button>
          <Button type='submit' variant={ButtonVariant.Tertiary}>
            Dodaj
          </Button>
        </div>
      </div>
      <Button
        onClick={() => setFormIsOpen(false)}
        type='button'
        variant={ButtonVariant.Icon}
        className='ml-2 self-start'
      >
        <TrashIcon />
      </Button>
    </form>
  );
}
