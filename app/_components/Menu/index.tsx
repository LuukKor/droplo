'use client';

import { useContext } from 'react';

import { MenuContext } from '@/_contexts/menu';
import { EmptyList } from '@components/EmptyList';

import { MenuView } from './MenuView';

export const Menu = () => {
  const { menuElements, setMenuElements } = useContext(MenuContext);

  if (menuElements.length === 0)
    return <EmptyList setMenuElements={setMenuElements} />;

  return <MenuView menuElements={menuElements} />;
};
