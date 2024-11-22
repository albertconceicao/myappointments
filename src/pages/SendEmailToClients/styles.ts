import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  max-width: 400px;

  input + input {
    margin-top: 0.5rem;
  }

  input[type='file'] {
    background: ${({ theme }) => theme.colors.primary.lighter};
  }
  button {
    margin-top: 0.8rem;
    max-width: fit-content;
  }
`;
