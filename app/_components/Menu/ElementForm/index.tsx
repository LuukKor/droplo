'use client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { MenuContext } from '@contexts/menu';

import { ElementFormView } from './ElementFormView';

type MenuElementFormProps = {
  id: number;
};

type MenuElementFormData = {
  name: string;
  link?: string;
};

export function MenuElementForm({ id }: MenuElementFormProps) {
  const { menuElements, setMenuElements, setFormIsOpen, removeMenuElement } =
    useContext(MenuContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuElementFormData>();
  const onSubmit = (data: MenuElementFormData) => {
    setMenuElements([
      ...menuElements,
      { id: id, label: data.name, url: data.link },
    ]);
    setFormIsOpen(false);
  };

  const haveElement = menuElements.findIndex((el) => el.id === id);

  console.log(haveElement);

  return (
    <ElementFormView
      id={id}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      setFormIsOpen={setFormIsOpen}
      trashIconButtonHandle={haveElement > 0 && removeMenuElement}
    />
  );
}
