import { Route, Routes } from 'react-router-dom';

import { Customers } from './pages/Customers';
import { Finances } from './pages/Finances';
import { FinishRegistration } from './pages/FinishRegistration';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
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
      <Route path="/financeiro" element={<Finances />} />
    </Routes>
  );
}
