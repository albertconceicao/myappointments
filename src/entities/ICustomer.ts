export interface ICustomerProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IClientProps extends ICustomerProps {
  id: string;
  password: string;
}
export interface ICustomerLoginProps {
  email: string;
  password: string;
}

export interface ICustomerAppointmentsProps {
  customerId: string;
  date: Date;
  notes: string;
  description: string;
}
