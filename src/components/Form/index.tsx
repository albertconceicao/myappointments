import { useState } from 'react';

import { useErrors } from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';
import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';

import { Container } from './styles';

export function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const isFormValid = name && errors.length === 0;
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Email com formato inválido' });
    } else {
      removeError('email');
    }
  }

  return (
    <Container>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
        />
        <FormGroup error={getErrorMessageByFieldName('email')}>
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={!!getErrorMessageByFieldName('email')}
          />
        </FormGroup>
      </FormGroup>
      <Button type="button" disabled={!isFormValid}>
        Enviar
      </Button>
    </Container>
  );
}
