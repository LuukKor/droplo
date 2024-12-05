import { ButtonVariant } from '@/_types/enums';
import { MenuElement } from '@components/MenuElement';
import { Button } from '@components/ui/Button';
import { MenuElementT } from '@types';

type MenuViewProps = {
  menuElements: MenuElementT[];
};

export const MenuView = ({ menuElements }: MenuViewProps) => {
  return (
    <div className='mt-[30px] rounded-lg border border-gray-300 bg-gray-50'>
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
