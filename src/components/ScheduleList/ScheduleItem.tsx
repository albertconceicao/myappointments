import { useState } from 'react';

import { ICustomerAppointmentsProps } from '../../entities/ICustomer';
import Button from '../Button';

import { ScheduleItemContainer, ScheduleItemTitle } from './styles';

export function ScheduleItem({
  customer,
  dateAndHour,
  notes,
  description,
}: ICustomerAppointmentsProps) {
  const [showDetails, setShowDetails] = useState(false);

  function handleShowDetails() {
    setShowDetails(true);
  }
  function handleHideDetails() {
    setShowDetails(false);
  }
  return (
    <ScheduleItemContainer>
      <ScheduleItemTitle>Agendamento {customer.name}</ScheduleItemTitle>
      <small>{dateAndHour.toLocaleString()}</small>

      <p>
        <strong>Anotações:</strong>
        {notes}
      </p>
      {showDetails && (
        <p>
          <strong>Detalhes: </strong>
          {description}
        </p>
      )}
      {showDetails ? (
        <Button type="button" onClick={handleHideDetails}>
          Esconder detalhes
        </Button>
      ) : (
        <Button type="button" onClick={handleShowDetails}>
          Visualizar mais detalhes
        </Button>
      )}
    </ScheduleItemContainer>
  );
}
