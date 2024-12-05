'use client';

import { useContext } from 'react';

import { EmptyList } from '@components/EmptyList';
import { MenuContext } from '@contexts/menu';

import { MenuElementForm } from './ElementForm';
import { MenuView } from './MenuView';

export const Menu = () => {
  const { menuElements, formIsOpen, setFormIsOpen, activeID, setActiveID } =
    useContext(MenuContext);

  const openForm = (id: string) => {
    setFormIsOpen(true);
    setActiveID(id);
  };

  if (formIsOpen) return <MenuElementForm id={activeID} />;

  if (menuElements.length === 0)
    return <EmptyList openForm={openForm} id={activeID} />;

  return <MenuView menuElements={menuElements} openForm={openForm} />;
};
