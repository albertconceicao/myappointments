import Button from '../Button';

import { ScheduleItem } from './ScheduleItem';
import { Container, ScheduleTitle } from './styles';

export function ScheduleList() {
  const appointmentsMock = [
    {
      id: 1,
      customer: {
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        phone: '+5511999999999',
        password: 'maria1234',
      },
      dateAndHour: new Date('2024-09-01T10:00:00'),
      description: 'Consulta médica de rotina',
      notes: 'Trazer exames anteriores',
    },
    {
      id: 2,
      customer: {
        name: 'João Souza',
        email: 'joao.souza@email.com',
        phone: '+5511888888888',
        password: 'joao5678',
      },
      dateAndHour: new Date('2024-09-02T14:30:00'),
      description: 'Avaliação odontológica',
      notes: 'Verificar sensibilidade nos dentes',
    },
    {
      id: 3,
      customer: {
        name: 'Ana Pereira',
        email: 'ana.pereira@email.com',
        phone: '+5511777777777',
        password: 'ana91011',
      },
      dateAndHour: new Date('2024-09-03T16:00:00'),
      description: 'Reunião com o cliente para discutir o projeto',
      notes: 'Levar propostas atualizadas',
    },
    {
      id: 4,
      customer: {
        name: 'Carlos Mendes',
        email: 'carlos.mendes@email.com',
        phone: '+5511666666666',
        password: 'carlos1213',
      },
      dateAndHour: new Date('2024-09-04T11:00:00'),
      description: 'Aula particular de inglês',
      notes: 'Revisar tempos verbais',
    },
  ];

  function handleRefreshList() {
    console.log('Lista atualizada');
  }
  return (
    <Container>
      <ScheduleTitle>Agenda</ScheduleTitle>
      <Button type="button" onClick={handleRefreshList}>
        Atualizar
      </Button>
      {appointmentsMock.map((appointment) => (
        <ScheduleItem
          key={appointment.id}
          id={appointment.id.toString()}
          customer={appointment.customer}
          dateAndHour={appointment.dateAndHour}
          notes={appointment.notes}
          description={appointment.description}
        />
      ))}
    </Container>
  );
}
