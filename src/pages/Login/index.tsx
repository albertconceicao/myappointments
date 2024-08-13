import { LoginForm } from '../../components/LoginForm';

export interface IFormDataProps {
  name: string;
  email: string;
  phone: string;
}

export function Login() {
  async function handleSubmit(formData: IFormDataProps) {
    try {
      console.log({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Request finished');
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} buttonLabel="Cadastro" />
    </div>
  );
}
