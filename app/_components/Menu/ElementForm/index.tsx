'use client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { MenuContext } from '@contexts/menu';
import { MenuElementFormData } from '@types';
import { findIndexById } from '@utils';

import { ElementFormView } from './ElementFormView';

type MenuElementFormProps = {
  id: string;
};

export function MenuElementForm({ id }: MenuElementFormProps) {
  const {
    menuElements,
    setFormIsOpen,
    removeMenuElement,
    handleMenuElementFormSubmit,
    isAddToSubmenu,
  } = useContext(MenuContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuElementFormData>();
  const index = findIndexById(menuElements, id);
  const haveElement = !isAddToSubmenu && index !== null && index.length > 0;
  const onSubmit = (data: MenuElementFormData) =>
    handleMenuElementFormSubmit(id, data);

  return (
    <ElementFormView
      id={id}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      setFormIsOpen={setFormIsOpen}
      trashIconButtonHandle={haveElement && removeMenuElement}
    />
  );
}
