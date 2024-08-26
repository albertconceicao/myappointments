import { ICustomerAppointmentsProps } from '../../entities/ICustomer';

import { ScheduleItemContainer, ScheduleItemTitle } from './styles';

export function ScheduleItem({
  customer,
  dateAndHour,
  notes,
}: ICustomerAppointmentsProps) {
  return (
    <ScheduleItemContainer>
      <ScheduleItemTitle>Agendamento {customer.name}</ScheduleItemTitle>
      <small>{dateAndHour.toLocaleString()}</small>

      <p>
        <strong>Anotações:</strong>
        {notes}
      </p>
    </ScheduleItemContainer>
  );
}
