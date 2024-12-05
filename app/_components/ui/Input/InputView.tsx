import { cn } from '@utils';

type InputViewProps = {
  id: string;
  label: string;
  placeholder: string;
  inputClassNames: string;
  classNames?: string;
  defaultValue?: string;
  icon?: JSX.Element;
};

export const InputView = ({
  id,
  label,
  placeholder,
  inputClassNames,
  classNames,
  defaultValue,
  icon,
  ...props
}: InputViewProps) => {
  return (
    <div className={cn('relative flex flex-col', classNames)}>
      <label
        className='mb-[6px] text-sm font-medium text-gray-600'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={cn(
          'pl- rounded-lg border border-gray-300 px-3 py-2 text-base font-normal text-gray-600 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-300',
          inputClassNames
        )}
        defaultValue={defaultValue}
        type='text'
        placeholder={placeholder}
        {...props}
      />
      {icon && (
        <span className='absolute bottom-3 left-4 text-gray-400'>{icon}</span>
      )}
    </div>
  );
};
