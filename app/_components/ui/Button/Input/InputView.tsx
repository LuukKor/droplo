import { cn } from '@/_utils';

type InputViewProps = {
  id: string;
  label: string;
  placeholder: string;
  inputClassNames: string;
  classNames?: string;
  icon?: JSX.Element;
};

export const InputView = ({
  id,
  label,
  placeholder,
  inputClassNames,
  classNames,
  icon,
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
          'pl- rounded-lg border border-gray-300 px-3 py-2 text-base font-normal text-gray-600 placeholder:text-gray-400',
          inputClassNames
        )}
        type='text'
        placeholder={placeholder}
      />
      {icon && (
        <span className='absolute bottom-3 left-4 text-gray-400'>{icon}</span>
      )}
    </div>
  );
};
