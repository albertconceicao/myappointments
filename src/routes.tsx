import { Route, Routes } from 'react-router-dom';

import { Customers } from './pages/Customers';
import { FinishRegistration } from './pages/FinishRegistration';
import { Home } from './pages/Home';
import { Reports } from './pages/Reports';
import { Schedule } from './pages/Schedule';
import { SendEmailToClients } from './pages/SendEmailToClients';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agenda" element={<Schedule />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/registro" element={<SignUp />} />
      <Route path="/pacientes" element={<Customers />} />
      <Route path="/finalizar-cadastro/:id" element={<FinishRegistration />} />
      <Route path="/financeiro" element={<Reports />} />
      <Route path="/notificar-clientes" element={<SendEmailToClients />} />
    </Routes>
  );
}
