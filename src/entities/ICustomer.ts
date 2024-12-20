export interface ICustomerProps {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface IClientProps extends ICustomerProps {
  id: string;
}
export interface ICustomerLoginProps {
  email: string;
  password: string;
}

export interface ICustomerAppointmentsProps extends ICustomerProps {
  customerId: {
    name: string;
    email: string;
    phone: string;
  };
  date: Date | string;
  notes: string;
  description: string;
}

export interface ICustomerAppointmentsDraftProps {
  customerId: {
    name?: string;
    email?: string;
    phone?: string;
  };
  date: Date | string;
  notes: string;
  description: string;
}
