import { MenuElement } from '@components/MenuElement';
import { MenuElementT } from '@types';

type MenuViewProps = {
  menuElements: MenuElementT[];
};

export const MenuView = ({ menuElements }: MenuViewProps) => {
  return (
    <div className=''>
      {menuElements.map((menuElement) => {
        return (
          <MenuElement
            key={`${menuElement.id}`}
            menuElement={menuElement}
            menuElements={menuElements}
          />
        );
      })}
    </div>
  );
};
