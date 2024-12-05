import { ButtonProps, GroupedButtonProps } from '@/_types';
import { Button } from '@components/ui/Button';

export const GroupedButtons = ({
  buttons,
  variant,
  id,
}: GroupedButtonProps) => {
  return (
    <div className='ml-auto flex'>
      {buttons.map((button: ButtonProps, i) => {
        let classNames = 'rounded-none border-x-transparent';

        if (i === 0) {
          classNames = 'rounded-r-none';
        } else if (i === buttons.length - 1) {
          classNames = 'rounded-l-none';
        }
        return (
          <Button
            key={`${i}_${id}`}
            variant={variant}
            className={classNames}
            onClick={button?.onClick}
          >
            {button.children}
          </Button>
        );
      })}
    </div>
  );
};
