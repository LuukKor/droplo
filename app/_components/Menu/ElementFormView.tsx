'use client';

import { useContext } from 'react';

import { EmptyList } from '@components/EmptyList';
import { MenuContext } from '@contexts/menu';

import { MenuElementForm } from './ElementForm';
import { MenuView } from './MenuView';

export const Menu = () => {
  const { menuElements, setMenuElements, formIsOpen } = useContext(MenuContext);

  if (formIsOpen) return <MenuElementForm id={0} />;

  if (menuElements.length === 0)
    return <EmptyList setMenuElements={setMenuElements} />;

  return <MenuView menuElements={menuElements} />;
};
