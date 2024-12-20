import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ClientForm } from '../../components/ClientForm';
import { IClientProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

import { Container } from './styles';

export function FinishRegistration() {
  const customerFormRef = useRef<{
    setFieldsValues: (customer: IClientProps) => void;
  } | null>(null);

  console.log({ customerFormRef });
  const { id } = useParams();
  useEffect(() => {
    async function loadCustomer() {
      try {
        if (!id) {
          throw new Error('Customer ID is undefined');
        }
        const customer = await CustomersService.getCustomerById(id);
        console.log({ customer });

        if (customerFormRef.current) {
          customerFormRef.current.setFieldsValues(customer);
        }
        console.log({ customer });
      } catch {
        toast.warn('Erro ao carregar cliente');
      }
    }
    loadCustomer();
  }, [id]);
  async function handleSubmit(formData: IClientProps) {
    try {
      const customer = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      if (id) {
        await CustomersService.updateCustomer(id, customer);
        toast.success('Cadastro atualizado com sucesso');
      } else {
        throw new Error('Customer ID not found');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar cadastro');
    } finally {
      console.log('Request finished');
    }
  }
  return (
    <Container>
      <h1>Finalizar cadastro</h1>
      <ClientForm
        ref={customerFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Finalizar Cadastro"
        signIn={false}
      />
    </Container>
  );
}
