'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { MenuElement, WithChildren } from '@types';

type MenuContextProps = {
  menuElements: MenuElement[];
  setMenuElements: Dispatch<SetStateAction<MenuElement[]>>;
};

export const MenuContext = createContext<MenuContextProps>({
  menuElements: [],
  setMenuElements: () => {},
});

export function MenuContextProvider({ children }: WithChildren) {
  const [menuElements, setMenuElements] = useState<MenuElement[]>([]);
  console.log(menuElements);

  return (
    <MenuContext.Provider value={{ menuElements, setMenuElements }}>
      {children}
    </MenuContext.Provider>
  );
}
