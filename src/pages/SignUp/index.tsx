import { CustomerForm } from '../../components/CustomerForm';
import { ICustomerProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

import { Container } from './styles';

export function SignUp() {
  async function handleSubmit(formData: ICustomerProps) {
    try {
      const customer = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: '',
      };
      console.log(formData.phone);
      const response = await CustomersService.createCustomer(customer);

      console.log(response);
    } catch (error) {
      console.log(error);
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
