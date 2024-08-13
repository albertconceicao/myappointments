import { Spinner } from '../Spinner';

import { Container } from './styles';

interface IFormGroup {
  children: React.ReactNode;
  error?: string;
  isLoading?: boolean;
}
export function FormGroup({ children, error, isLoading }: IFormGroup) {
  console.log(isLoading);
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner />
          </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
