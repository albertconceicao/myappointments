import { Route, Routes } from 'react-router-dom';

import { CreateCustomer } from './pages/CreateCustomer';
import { Customers } from './pages/Customers';
import { FinishRegistration } from './pages/FinishRegistration';
import { Home } from './pages/Home';
import { Reports } from './pages/Reports';
import { Schedule } from './pages/Schedule';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { PrivateRoutes } from './services/PrivateRoutes';

export function AppRoutes() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/cadastrar" element={<SignUp />} />
      <Route path="/registro" element={<CreateCustomer />} />
      <Route path="/blog" element={<div>Blog</div>} />
      {/* Rotas privadas */}
      <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Schedule />} />
        <Route path="/pacientes" element={<Customers />} />
        <Route
          path="/finalizar-cadastro/:id"
          element={<FinishRegistration />}
        />
        <Route path="/financeiro" element={<Reports />} />
        {/* <Route path="/notificar-clientes" element={<SendEmailToClients />} /> */}
      </Route>
    </Routes>
  );
}
