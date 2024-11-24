import { FC, HTMLAttributes } from 'react';
import './Button.scss';
import Loader from '../Loader';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  kind?: 'primary' | 'secondary';
  type?: 'submit' | 'reset' | 'button';
  loader?: 'points' | 'spinner';
}
const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  kind = 'primary',
  type,
  loader,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`btn-reset btn ${className}`}
      data-kind={kind}
      {...props}
    >
      {isLoading ? <Loader type={loader} /> : children}
    </button>
  );
};

export default Button;
