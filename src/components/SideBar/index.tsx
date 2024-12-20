import { slide as Menu } from 'react-burger-menu';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button';

import { LinkItem } from './LinkItem';
import {
  BottomLinks,
  Container,
  MobileContainer,
  TopLinks,
  WebContainer,
} from './styles';

export function SideBar() {
  const { logout } = useAuth();
  const location = useLocation();
  const shouldShowSidebar =
    location.pathname !== '/login' &&
    location.pathname !== '/finalizar-cadastro' &&
    location.pathname !== '/cadastrar';
  return (
    shouldShowSidebar && (
      <>
        <MobileContainer>
          <Menu bubble>
            <Container>
              <TopLinks>
                <LinkItem path="/" name="Dashboard" icon="dashboard" />
                <LinkItem path="/agenda" name="Agenda" icon="calendar" />

                <LinkItem path="/pacientes" name="Pacientes" icon="customers" />
                <LinkItem path="/financeiro" name="Financeiro" icon="finance" />
              </TopLinks>

              <BottomLinks>
                <LinkItem path="/admin" name="Configurações" icon="settings" />
                <LinkItem path="/help" name="Suporte" icon="help-center" />
                <Button type="button" onClick={logout}>
                  Logout
                </Button>
              </BottomLinks>
              {/* <Link to="/">Home</Link>
        <Link to="/schedule">Agenda</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
        <Link to="/customers">Pacientes</Link> */}
            </Container>
          </Menu>
        </MobileContainer>

        <WebContainer>
          <Container>
            <TopLinks>
              <LinkItem path="/" name="Dashboard" icon="dashboard" />
              <LinkItem path="/agenda" name="Agenda" icon="calendar" />

              <LinkItem path="/pacientes" name="Pacientes" icon="customers" />
              <LinkItem path="/financeiro" name="Financeiro" icon="finance" />
            </TopLinks>

            <BottomLinks>
              <LinkItem path="/admin" name="Configurações" icon="settings" />
              <LinkItem path="/help" name="Suporte" icon="help-center" />
              <Button type="button" onClick={logout}>
                Logout
              </Button>
            </BottomLinks>
          </Container>
          {/* <Link to="/">Home</Link>
        <Link to="/schedule">Agenda</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
        <Link to="/customers">Pacientes</Link> */}
        </WebContainer>
      </>
    )
  );
}
