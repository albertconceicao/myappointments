import { format } from 'date-fns';

import {
  ICustomerAppointmentsDraftProps,
  ICustomerAppointmentsProps,
} from '../../entities/ICustomer';
import Input from '../Input';
import Select from '../Select';

import { AppintmentContent } from './styles';

export function AppointmentForm({
  customers,
  appointment,
  onFieldChange,
}: {
  customers: ICustomerAppointmentsProps[];
  appointment: ICustomerAppointmentsDraftProps;
  onFieldChange: (
    field: string,
    value: ICustomerAppointmentsProps | Date | string,
  ) => void;
}) {
  console.log(appointment.date);
  return (
    <AppintmentContent>
      <Select
        value={
          (appointment?.customerId as ICustomerAppointmentsProps)?._id || ''
        }
        onChange={(e) =>
          onFieldChange(
            'customerId',
            customers.find((customer) => customer._id === e.target.value) ||
              ({} as ICustomerAppointmentsProps),
          )
        }
      >
        <option value="" disabled>
          Selecione um paciente
        </option>
        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.name}
          </option>
        ))}
      </Select>
      <Input
        type="date"
        value={
          appointment?.date
            ? format(new Date(appointment.date), 'yyyy-MM-dd') // Formato para campos de data
            : ''
        }
        onChange={(e) => {
          const [year, month, day] = e.target.value.split('-').map(Number);
          const updatedDate = new Date(appointment.date);
          updatedDate.setFullYear(year, month - 1, day); // Atualiza somente a data
          onFieldChange('date', updatedDate);
        }}
      />
      <Input
        type="time"
        value={
          appointment?.date
            ? format(new Date(appointment.date), 'HH:mm') // Formato para campos de hora
            : ''
        }
        onChange={(e) => {
          const [hours, minutes] = e.target.value.split(':').map(Number);
          const updatedDate = new Date(appointment.date);
          updatedDate.setHours(hours, minutes); // Atualiza somente o horário
          onFieldChange('date', updatedDate);
        }}
      />
      <Input
        type="text"
        placeholder="Descrição"
        value={appointment?.description || ''}
        onChange={(e) => onFieldChange('description', e.target.value)}
      />
      <textarea
        placeholder="Notas"
        value={appointment?.notes || ''}
        onChange={(e) => onFieldChange('notes', e.target.value)}
      />
    </AppintmentContent>
  );
}
