import React, { useState } from 'react';

import { IDoctorProps } from '../../entities/IDoctor';
import { useErrors } from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';
import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';

import { ButtonContainer, Form } from './styles';

interface IDoctorFormProps {
  buttonLabel: string;
  onSubmit: (formData: IDoctorProps) => Promise<void>;
  signIn: boolean;
}

export function DoctorForm({
  buttonLabel,
  onSubmit,
  signIn,
}: IDoctorFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  // const isSignUpFormValid = name && errors.length === 0;
  const isSignInFormValid = email && errors.length === 0;
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

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    // const regex =
    //   // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#])[A-Za-z\d@$!%*?&,#]{8,}$/;

    if (!password) {
      setError({
        field: 'password',
        message:
          'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
      });
    } else {
      removeError('password');
    }
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    setTimeout(async () => {
      await onSubmit({
        name,
        email,
        phone: phone.replace(/\D/g, ''),
        password,
      });
    }, 2000);

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        {!signIn && (
          <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={handleNameChange}
            error={!!getErrorMessageByFieldName('name')}
            disabled={isSubmitting}
          />
        )}
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('password')}>
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={!!getErrorMessageByFieldName('password')}
          disabled={isSubmitting}
        />
      </FormGroup>
      {!signIn && (
        <FormGroup>
          <Input
            placeholder="Telefone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={15}
            disabled={isSubmitting}
          />
        </FormGroup>
      )}
      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isSignInFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
