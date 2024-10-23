import { useLocation } from 'react-router-dom';

import { LinkItem } from './LinkItem';
import { BottomLinks, Container, TopLinks } from './styles';

export function SideBar() {
  const location = useLocation();
  const shouldShowSidebar =
    location.pathname !== '/login' &&
    location.pathname !== '/finalizar-cadastro';
  return (
    shouldShowSidebar && (
      <Container>
        <TopLinks>
          <LinkItem path="/" name="Dashboard" icon="dashboard" />
          <LinkItem path="/agenda" name="Agenda" icon="calendar" />
          <LinkItem path="/login" name="Login" icon="login" />
          <LinkItem
            path="/registro"
            name="Adicionar paciente"
            icon="register"
          />
          <LinkItem path="/pacientes" name="Pacientes" icon="customers" />
          <LinkItem path="/financeiro" name="Financeiro" icon="finance" />
        </TopLinks>

        <BottomLinks>
          <LinkItem path="/admin" name="Configurações" icon="settings" />
          <LinkItem path="/help" name="Suporte" icon="help-center" />
          <LinkItem path="/logout" name="Sair" icon="logout" />
        </BottomLinks>
        {/* <Link to="/">Home</Link>
        <Link to="/schedule">Agenda</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
        <Link to="/customers">Pacientes</Link> */}
      </Container>
    )
  );
}
