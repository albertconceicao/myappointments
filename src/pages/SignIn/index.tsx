import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

import { DoctorForm } from '../../components/DoctorForm';
import { useAuth } from '../../contexts/AuthContext';
import CustomersService from '../../services/CustomersService';
import DoctorsService from '../../services/DoctorsService';

import { Container } from './styles';

export function SignIn() {
  const { token, setToken, setDoctorId } = useAuth();

  async function handleSubmit(formData: { email: string; password: string }) {
    try {
      const doctorCredentials = {
        email: formData.email,
        password: formData.password,
      };

      let currentToken = token;

      if (!currentToken) {
        const jwtToken = await DoctorsService.doctorLogin(doctorCredentials);
        const decodedToken: { doctorId: string } = jwtDecode(jwtToken);

        setToken(jwtToken);
        setDoctorId(decodedToken.doctorId);

        currentToken = jwtToken;
      }

      const bearerToken = `Bearer ${token}`;
      const customers = await CustomersService.listCustomers('asc', {
        Authorization: bearerToken,
      });
      console.log({ customers });

      toast.success('Login efetuado com sucesso, redirecionando para Home');
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao fazer login, tente novamente.');
    } finally {
      console.log('Request finalizada');
    }
  }

  return (
    <Container>
      <h1>Entrar no sistema</h1>
      <DoctorForm
        onSubmit={handleSubmit}
        buttonLabel="Entrar na conta"
        signIn
      />
    </Container>
  );
}
