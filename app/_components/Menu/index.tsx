'use client';

import { useContext } from 'react';

import { EmptyList } from '@components/EmptyList';
import { MenuContext } from '@contexts/menu';

import { MenuElementForm } from './ElementForm';
import { MenuView } from './MenuView';

export const Menu = () => {
  const { menuElements, formIsOpen, setFormIsOpen } = useContext(MenuContext);

  if (menuElements.length === 0 && formIsOpen)
    return <MenuElementForm id={0} />;

  if (menuElements.length === 0)
    return <EmptyList setFormIsOpen={setFormIsOpen} />;

  return <MenuView menuElements={menuElements} />;
};
