import { CustomerForm } from '../../components/CustomerForm';
import { ICustomerProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

export function SignIn() {
  async function handleSubmit(formData: ICustomerProps) {
    try {
      const customer = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      const response = await CustomersService.createCustomer(customer);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Request finished');
    }
  }
  return (
    <div>
      <h1>Entrar na conta</h1>
      <CustomerForm
        onSubmit={handleSubmit}
        buttonLabel="Entrar na conta"
        signIn
      />
    </div>
  );
}
