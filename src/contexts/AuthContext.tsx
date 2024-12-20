import React, { createContext, useContext, useEffect, useState } from 'react';

import { IAuthContextProps } from '../entities/IAuthentication';

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [token, setTokenState] = useState<string | null>(null);
  const [doctorId, setDoctorIdState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedDoctorId = localStorage.getItem('doctorId');

    if (storedToken) {
      setTokenState(storedToken);
    }

    if (storedDoctorId) {
      setDoctorIdState(storedDoctorId);
    }
  }, []);

  const setToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setTokenState(newToken);
  };

  const setDoctorId = (newDoctorId: string) => {
    localStorage.setItem('doctorId', newDoctorId);
    setDoctorIdState(newDoctorId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctorId');
    window.location.href = '/login';
    setTokenState(null);
    setDoctorIdState(null);
  };

  const value = React.useMemo(
    () => ({
      token,
      doctorId,
      setToken,
      setDoctorId,
      logout,
    }),
    [token, doctorId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
