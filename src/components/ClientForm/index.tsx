import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { IClientProps } from '../../entities/ICustomer';
import { useErrors } from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';
import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';

import { ButtonContainer, Form } from './styles';

interface IClientFormProps {
  buttonLabel: string;
  onSubmit: (formData: IClientProps) => Promise<void>;
  signIn: boolean;
}

export const ClientForm = forwardRef(
  ({ buttonLabel, onSubmit, signIn }: IClientFormProps, ref) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, setError, removeError, getErrorMessageByFieldName } =
      useErrors();

    // const isSignUpFormValid = name && errors.length === 0;
    const isSignInFormValid = email && errors.length === 0;

    useImperativeHandle(
      ref,
      () => ({
        setFieldsValues: (customer: IClientProps) => {
          setName(customer.name ?? '');
          setEmail(customer.email ?? '');
          setPhone(formatPhone(customer.phone) ?? '');
        },
        resetFields: () => {
          setName('');
          setEmail('');
          setPhone('');
        },
      }),
      [],
    );
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
          id,
          name,
          email,
          phone,
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
  },
);
