import { Link, useLocation } from 'react-router-dom';

import { Profile } from './Profile';
import { Container, Logo } from './styles';

export function Header() {
  const location = useLocation();
  const shouldShowHeaderProfile =
    location.pathname !== '/login' && location.pathname !== '/cadastrar';
  return (
    <Container profile={shouldShowHeaderProfile}>
      <Link to="/agenda">
        <Logo>E-Clínica</Logo>
      </Link>
      {shouldShowHeaderProfile && <Profile />}
    </Container>
  );
}
