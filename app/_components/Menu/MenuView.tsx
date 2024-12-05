import { MenuElement } from '@components/MenuElement';
import { MenuElementT } from '@types';

type MenuViewProps = {
  menuElements: MenuElementT[];
};

export const MenuView = ({ menuElements }: MenuViewProps) => {
  return (
    <div className='rounded-lg border border-gray-300 bg-gray-50'>
      {menuElements.map((menuElement, index) => {
        return (
          <MenuElement
            key={`${menuElement.id}`}
            menuElement={menuElement}
            index={index}
          />
        );
      })}
    </div>
  );
};
