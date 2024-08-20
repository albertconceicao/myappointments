import { Route, Routes } from 'react-router-dom';

import { Customers } from './pages/Customers';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/customers" element={<Customers />} />
    </Routes>
  );
}
