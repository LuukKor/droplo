import { MenuElement } from '@components/Menu/Element';
import { Button } from '@components/ui/Button';
import { ButtonVariant } from '@enums';
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
            key={`${menuElement.id}_${index}`}
            menuElement={menuElement}
            index={index}
          />
        );
      })}
      <div className='px-6 py-5'>
        <Button variant={ButtonVariant.Secondary}>Dodaj pozycję menu</Button>
      </div>
    </div>
  );
};
