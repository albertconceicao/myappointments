export interface IAuthContextProps {
  token: string | null;
  doctorId: string | null;
  doctorName: string | null;
  setToken: (token: string) => void;
  setDoctorId: (doctorId: string) => void;
  setDoctorName: (doctorName: string) => void;
  logout: () => void;
}
