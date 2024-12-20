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
  const [doctorName, setDoctorNameState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedDoctorId = localStorage.getItem('doctorId');
    const storedDoctorName = localStorage.getItem('doctorName');

    if (storedToken) {
      setTokenState(storedToken);
    }

    if (storedDoctorId) {
      setDoctorIdState(storedDoctorId);
    }

    if (storedDoctorName) {
      setDoctorNameState(storedDoctorName);
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

  const setDoctorName = (newDoctorName: string) => {
    localStorage.setItem('doctorName', newDoctorName);
    setDoctorNameState(newDoctorName);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctorId');
    localStorage.removeItem('doctorName');
    window.location.href = '/login';
    setTokenState(null);
    setDoctorIdState(null);
    setDoctorNameState(null);
  };

  const value = React.useMemo(
    () => ({
      token,
      doctorId,
      doctorName,
      setToken,
      setDoctorId,
      setDoctorName,
      logout,
    }),
    [token, doctorId, doctorName],
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
