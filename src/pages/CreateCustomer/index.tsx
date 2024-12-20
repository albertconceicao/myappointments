import { toast } from 'react-toastify';

import { CustomerForm } from '../../components/CustomerForm';
import { useAuth } from '../../contexts/AuthContext';
import { ICustomerProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

import { Container } from './styles';

export function CreateCustomer() {
  const { token } = useAuth();
  async function handleSubmit(formData: ICustomerProps) {
    try {
      const customer = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      console.log(formData.phone);
      const bearerToken = `Bearer ${token}`;
      const response = await CustomersService.createCustomer(customer, {
        Authorization: bearerToken,
      });

      toast.success('Paciente cadastrado com sucesso!');
      console.log(response);
    } catch (error) {
      toast.error('Ocorreu um erro ao cadastrar o paciente!');
    } finally {
      console.log('Request finished');
    }
  }
  return (
    <Container>
      <h1>Cadastrar novo paciente</h1>
      <CustomerForm
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar paciente"
        signIn={false}
      />
    </Container>
  );
}
