import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Modal } from '../Modal';

interface IAppointment {
  id: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
  dateAndHour: Date;
  description: string;
  notes: string;
}

const appointmentsMock: IAppointment[] = [
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
export function ScheduleList() {
  const [appointments, setAppointments] = useState(appointmentsMock);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [appointmentBeingDeleted, setAppointmentBeingDeleted] =
    useState<IAppointment | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  function handleDeleteAppointment(appointment: IAppointment) {
    setAppointmentBeingDeleted(appointment);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setAppointmentBeingDeleted(null);
  }
  async function handleConfirmDeleteAppointment() {
    try {
      setIsLoadingDelete(true);
      // await ContactsService.deleteContact(contactBeingDeleted.id);

      console.log({ appointmentBeingDeleted });
      setAppointments((prev) =>
        prev.filter(
          (appointment) => appointment.id !== appointmentBeingDeleted?.id,
        ),
      );
      handleCloseDeleteModal();
      toast.success('Contato deletado com sucesso!');
    } catch {
      toast.warn('Ocorreu um erro ao deletar contato');
    } finally {
      setIsLoadingDelete(false);
    }
  }
  // function handleRefreshList() {
  //   console.log('Lista atualizada');
  // }
  // function handleCancel(id: number) {
  //   setAppointments((prev) =>
  //     prev.filter((appointment) => appointment.id !== id),
  //   );
  //   alert('Consulta cancelada e notificação enviada ao paciente.');
  // }
  function handleReschedule(id: number) {
    // Primeiro, solicitamos a data no formato brasileiro
    const newDate = prompt('Insira a nova data (DD/MM/YYYY):');
    if (newDate) {
      const [day, month, year] = newDate.split('/').map(Number);

      // Depois, solicitamos a hora separadamente
      const newTime = prompt('Insira o novo horário (HH:mm):');
      if (newTime) {
        const [hours, minutes] = newTime.split(':').map(Number);

        // Criando o objeto Date no formato correto
        const formattedDate = new Date(year, month - 1, day, hours, minutes);

        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id
              ? { ...appointment, dateAndHour: formattedDate }
              : appointment,
          ),
        );
        alert('Consulta remarcada com sucesso!');
      } else {
        alert('Horário inválido.');
      }
    } else {
      alert('Data inválida.');
    }
  }

  function syncWithCalendar(id: number) {
    alert('Sincronização em andamento');
  }
  return (
    <div>
      <Modal
        title={`Tem certeza que deseja remover o agendamento de "${appointmentBeingDeleted?.customer.name}"`}
        visible={isDeleteModalVisible}
        danger
        confirmLabel="Confirmar cancelamento"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteAppointment}
        isLoading={isLoadingDelete}
        cancelLabel="Fechar"
      >
        <p> Esta ação não poderá ser desfeita</p>
      </Modal>
      <h2>Gerenciamento de Consultas</h2>
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data e Hora</th>
            <th>Descrição</th>
            <th>Notas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.customer.name}</td>
              <td>{appointment.customer.email}</td>
              <td>{appointment.customer.phone}</td>
              <td>{format(appointment.dateAndHour, 'dd/MM/yyyy - HH:mm')}</td>
              <td>{appointment.description}</td>
              <td>{appointment.notes}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeleteAppointment(appointment)}
                >
                  {/* <button
                  type="button"
                  onClick={() => handleCancel(appointment.id)}
                > */}
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleReschedule(appointment.id)}
                >
                  Remarcar
                </button>
                <button
                  type="button"
                  onClick={() => syncWithCalendar(appointment.id)}
                >
                  Sincronizar Calendário
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
