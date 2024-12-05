import { InputView } from './InputView';

type InputProps = {
  id: string;
  label: string;
  placeholder: string;
  classNames?: string;
  icon?: JSX.Element;
};

export const Input = ({
  id,
  label,
  placeholder,
  classNames,
  icon,
  ...props
}: InputProps) => {
  const inputClassNames = icon ? 'pl-10' : '';

  return (
    <InputView
      id={id}
      label={label}
      placeholder={placeholder}
      classNames={classNames}
      inputClassNames={inputClassNames}
      icon={icon}
      {...props}
    />
  );
};
