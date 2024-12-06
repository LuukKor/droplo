'use client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { MenuContext } from '@contexts/menu';
import { MenuElementFormData, MenuElementT } from '@types';
import { findElementById, findIndexById } from '@utils';

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
  const element = findElementById(menuElements, id);
  const defaultValue =
    !isAddToSubmenu && element ? element : ({} as MenuElementT);

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
      defaultValue={defaultValue}
    />
  );
}
