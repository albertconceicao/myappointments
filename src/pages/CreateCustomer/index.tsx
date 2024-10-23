import { CustomerForm } from '../../components/CustomerForm';
import { ICustomerProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

import { Container } from './styles';

export function CreateCustomer() {
  async function handleSubmit(formData: ICustomerProps) {
    try {
      const customer = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const response = await CustomersService.createCustomer(customer);

      console.log({ response });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Request finished');
    }
  }
  return (
    <Container>
      <h1>Criar conta</h1>
      <CustomerForm
        onSubmit={handleSubmit}
        buttonLabel="Cadastro"
        signIn={false}
      />
    </Container>
  );
}
