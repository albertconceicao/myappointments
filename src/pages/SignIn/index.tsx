import { toast } from 'react-toastify';

import { CustomerForm } from '../../components/CustomerForm';
import { ICustomerProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

import { Container } from './styles';

export function SignIn() {
  async function handleSubmit(formData: ICustomerProps) {
    try {
      // eslint-disable-next-line no-inner-declarations
      function redirectToHome() {
        toast.success('Login efetuado com sucesso,redirecionando para Home');
        setTimeout(() => {
          window.location.href = '/home';
        }, 2000);
      }
      const customer = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const token = localStorage.getItem('token') || null;

      if (token) {
        redirectToHome();
      }

      // eslint-disable-next-line no-inner-declarations
      async function requestToken() {
        const { data } = await CustomersService.customerLogin(customer);
        localStorage.setItem('token', data.token);
        return data.token;
      }

      // if (!token || token === null) {
      //   requestToken();
      // }
      const bearerToken: string = `Bearer ${
        token != null ? token : await requestToken()
      }`;
      const customers = await CustomersService.listCustomers('asc', {
        Authorization: bearerToken,
      });
      redirectToHome();
      console.log({ customers });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Request finalizada');
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
