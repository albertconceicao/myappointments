import { ReactNode } from 'react';

import { Spinner } from '../Spinner';

import { StyledButton } from './styles';

interface IButtonProps {
  isLoading?: boolean;
  type: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  children: ReactNode;
}

export default function Button({
  isLoading = false,
  type,
  disabled,
  children,
}: IButtonProps) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {!isLoading && children}

      {isLoading && <Spinner />}
    </StyledButton>
  );
}

Button.defaultProps = {
  disabled: false,
  isLoading: false,
};
