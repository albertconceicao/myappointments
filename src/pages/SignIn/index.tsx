import { CustomerForm } from '../../components/CustomerForm';
import { ICustomerProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

import { Container } from './styles';

export function SignIn() {
  async function handleSubmit(formData: ICustomerProps) {
    try {
      const customer = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const token = localStorage.getItem('token') || null;

      if (!token || token === null) {
        const { data } = await CustomersService.customerLogin(customer);
        localStorage.setItem('token', data.token);
      }
      const bearerToken: string = `Bearer ${token}`;
      const customers = await CustomersService.listCustomers('asc', {
        Authorization: bearerToken,
      });
      console.log({ customers });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Request finished');
    }
  }
  return (
    <Container>
      <h1>Entrar na conta</h1>
      <CustomerForm
        onSubmit={handleSubmit}
        buttonLabel="Entrar na conta"
        signIn
      />
    </Container>
  );
}
