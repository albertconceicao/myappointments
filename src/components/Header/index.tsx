import { Link, useLocation } from 'react-router-dom';

import { Profile } from './Profile';
import { Container, Logo } from './styles';

export function Header() {
  const location = useLocation();
  const shouldShowHeaderProfile = location.pathname !== '/login';
  return (
    <Container profile={shouldShowHeaderProfile}>
      <Link to="/schedule">
        <Logo>E-Clínica</Logo>
      </Link>
      {shouldShowHeaderProfile && <Profile />}
    </Container>
  );
}
