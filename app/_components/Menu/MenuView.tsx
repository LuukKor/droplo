import { MenuElement } from '@components/Menu/Element';
import { Button } from '@components/ui/Button';
import { ButtonVariant } from '@enums';
import { MenuElementT } from '@types';

type MenuViewProps = {
  menuElements: MenuElementT[];
  openForm: (id: string) => void;
};

function renderMenuElements(menuElements: MenuElementT[]) {
  return menuElements.map((menuElement, index) => {
    return (
      <div key={`${menuElement.id}_${index}`}>
        <MenuElement menuElement={menuElement} index={index} />
        {menuElement?.submenu?.length > 0 && (
          <div className='ml-16'>{renderMenuElements(menuElement.submenu)}</div>
        )}
      </div>
    );
  });
}

export const MenuView = ({ menuElements, openForm }: MenuViewProps) => {
  return (
    <div className='overflow-hidden rounded-lg border border-gray-300 bg-gray-50'>
      {renderMenuElements(menuElements)}
      <div className='px-6 py-5'>
        <Button
          onClick={() => openForm(crypto.randomUUID())}
          variant={ButtonVariant.Secondary}
        >
          Dodaj pozycję menu
        </Button>
      </div>
    </div>
  );
};
