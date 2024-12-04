import { MenuElement } from '@types';

export const MenuView = ({ menuElements }: { menuElements: MenuElement[] }) => {
  return (
    <div className=''>
      {menuElements.map((menuElement) => {
        return (
          <div key={`${menuElement}`} className=''>
            {menuElement.label}
            {menuElement?.url && <small>{menuElement.url}</small>}
          </div>
        );
      })}
    </div>
  );
};
