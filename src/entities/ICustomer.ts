export interface ICustomerProps {
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
  id: string;
  dateAndHour: Date;
  customer: ICustomerProps;
  notes: string;
  description: string;
}
