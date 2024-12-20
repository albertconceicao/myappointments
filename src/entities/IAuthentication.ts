export interface IAuthContextProps {
  token: string | null;
  doctorId: string | null;
  setToken: (token: string) => void;
  setDoctorId: (doctorId: string) => void;
  logout: () => void;
}
