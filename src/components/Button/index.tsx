import { ReactNode } from 'react';

import { Spinner } from '../Spinner';

import { StyledButton } from './styles';

interface IButtonProps {
  isLoading?: boolean;
  type: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  children: ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export default function Button({
  isLoading = false,
  type,
  disabled,
  children,
  danger,
  onClick,
}: IButtonProps) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      danger={danger}
    >
      {!isLoading && children}

      {isLoading && <Spinner />}
    </StyledButton>
  );
}

Button.defaultProps = {
  isLoading: false,
  disabled: false,
  onClick: () => {},
  danger: false,
};
