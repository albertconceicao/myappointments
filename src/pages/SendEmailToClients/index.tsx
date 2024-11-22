import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { ICustomerProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

import { FormContainer } from './styles';

export function SendEmailToClients() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token') || null;
  const bearerToken: string = `Bearer ${token != null ? token : ''}`;

  const fetchCustomers = useCallback(async () => {
    if (token) {
      const customersList = await CustomersService.listCustomers('asc', {
        Authorization: bearerToken,
      });
      setCustomers(customersList);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers, token, bearerToken]);
  async function handleSubmitEmailToClients(email: string, file: File) {
    try {
      console.log({ customers });
      // Cria um novo objeto FormData
      const formData = new FormData();

      // Adiciona o email e o arquivo ao FormData
      formData.append('emailToSend', email);
      formData.append('file', file);

      await fetch(
        'https://ovafh91iaa.execute-api.sa-east-1.amazonaws.com/sendDynamicAttachedMailWithNodeMailer',
        {
          method: 'POST',
          body: formData,
        },
      );
      toast.success('Email enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      toast.warn('Ops... Não conseguimos enviar o email');
    }
  }

  // Formulário de exemplo para capturar o email e o arquivo
  return (
    <div>
      <h1>Send Email To Clients</h1>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          const emailInput = (e.target as HTMLFormElement).email.value;
          const fileInput = (e.target as HTMLFormElement).file.files[0];
          handleSubmitEmailToClients(emailInput, fileInput);
        }}
      >
        <select name="customers" id="customers">
          {customers.map((customer: ICustomerProps) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <Input
          type="file"
          name="file"
          accept="application/pdf, image/*"
          required
        />
        <Button type="submit">Enviar</Button>
      </FormContainer>
    </div>
  );
}
