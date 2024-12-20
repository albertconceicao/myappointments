import { toast } from 'react-toastify';

import { DoctorForm } from '../../components/DoctorForm';
import { IDoctorProps } from '../../entities/IDoctor';
import DoctorsService from '../../services/DoctorsService';

import { Container } from './styles';

export function SignUp() {
  async function handleSubmit(formData: IDoctorProps) {
    try {
      const doctor = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const response = await DoctorsService.createDoctor(doctor);

      toast.success('Cadastro realizado com sucesso!');
      setTimeout(() => {
        window.location.href = '/pacientes';
      }, 2000);
    } catch (error) {
      toast.error('Ocorreu um erro ao realizar o seu cadastro');
    } finally {
      console.log('Request finished');
    }
  }
  return (
    <Container>
      <h1>Criar conta</h1>
      <DoctorForm
        onSubmit={handleSubmit}
        buttonLabel="Cadastro"
        signIn={false}
      />
    </Container>
  );
}
