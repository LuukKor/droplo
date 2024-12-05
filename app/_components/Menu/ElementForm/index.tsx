'use client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { MenuElementFormData } from '@/_types';
import { MenuContext } from '@contexts/menu';

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
  } = useContext(MenuContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuElementFormData>();
  const haveElement = menuElements.findIndex((el) => el.id === id) > -1;
  const onSubmit = (data: MenuElementFormData) =>
    handleMenuElementFormSubmit(id, data, haveElement);

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
