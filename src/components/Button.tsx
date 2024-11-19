import { ComponentPropsWithRef, FC } from 'react';

const Button: FC<ComponentPropsWithRef<'button'>> = ({
  children,
  type = 'button',
  ...props
}) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
