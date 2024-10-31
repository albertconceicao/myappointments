import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CustomersService from '../../services/CustomersService';
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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [appointmentBeingEdited, setAppointmentBeingEdited] =
    useState<IAppointment | null>(null);

  const [isNewModalVisible, setIsNewModalVisible] = useState(false); // Novo estado para modal de novo agendamento
  const [newAppointment, setNewAppointment] = useState<IAppointment>({
    id: Date.now(),
    customer: { name: '', email: '', phone: '', password: '' },
    dateAndHour: new Date(),
    description: '',
    notes: '',
  });
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem('token') || null;
  const bearerToken: string = `Bearer ${token != null ? token : ''}`;

  const fetchCustomers = useCallback(async () => {
    if (token) {
      const customersList = await CustomersService.listCustomers('asc', {
        Authorization: bearerToken,
      });
      setCustomers(customersList);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers, token, bearerToken]);

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

  // Função para abrir o modal de edição
  function handleEditAppointment(appointment: IAppointment) {
    setAppointmentBeingEdited(appointment);
    setIsEditModalVisible(true);
  }

  // Função para salvar as edições
  function handleSaveEditAppointment() {
    if (appointmentBeingEdited) {
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentBeingEdited.id
            ? appointmentBeingEdited
            : appointment,
        ),
      );
      toast.success('Consulta editada com sucesso!');
      setIsEditModalVisible(false);
    }
  }

  // Função para abrir o modal de novo agendamento
  function handleOpenNewAppointmentModal() {
    setIsNewModalVisible(true);
  }

  // Função para fechar o modal de novo agendamento
  function handleCloseNewAppointmentModal() {
    setIsNewModalVisible(false);
  }

  // Função para adicionar um novo agendamento
  function handleAddNewAppointment() {
    const { id, ...customer } = newAppointment.customer; // Desestruturação para obter apenas o id
    setAppointments((prev) => [
      ...prev,
      { ...newAppointment, id: Date.now(), customer },
    ]);
    setNewAppointment({
      id: Date.now(),
      customer: { name: '', email: '', phone: '', password: '' },
      dateAndHour: new Date(),
      description: '',
      notes: '',
    });
    toast.success('Novo agendamento adicionado!');
    handleCloseNewAppointmentModal();
  }

  function syncWithCalendar(id: number) {
    alert('Sincronização em andamento');
  }
  return (
    <div>
      <Modal
        title="Adicionar Novo Agendamento"
        visible={isNewModalVisible}
        onCancel={handleCloseNewAppointmentModal}
        onConfirm={handleAddNewAppointment}
        confirmLabel="Adicionar"
        cancelLabel="Fechar"
        danger={false}
      >
        <div>
          <select
            onChange={(e) => {
              const selectedCustomer = customers.find(
                (customer) => customer.id === e.target.value,
              );
              setNewAppointment((prev) => ({
                ...prev,
                customer: selectedCustomer || {
                  name: '',
                  email: '',
                  phone: '',
                  password: '',
                },
              }));
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione um paciente
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nome do Paciente"
            value={newAppointment.customer.name}
            onChange={(e) =>
              setNewAppointment((prev) => ({
                ...prev,
                customer: { ...prev.customer, name: e.target.value },
              }))
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newAppointment.customer.email}
            onChange={(e) =>
              setNewAppointment((prev) => ({
                ...prev,
                customer: { ...prev.customer, email: e.target.value },
              }))
            }
          />
          <input
            type="tel"
            placeholder="Telefone"
            value={newAppointment.customer.phone}
            onChange={(e) =>
              setNewAppointment((prev) => ({
                ...prev,
                customer: { ...prev.customer, phone: e.target.value },
              }))
            }
          />
          <input
            type="date"
            value={format(newAppointment.dateAndHour, 'yyyy-MM-dd')}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split('-').map(Number);
              const newDate = new Date(newAppointment.dateAndHour);
              newDate.setFullYear(year, month - 1, day);
              setNewAppointment((prev) => ({
                ...prev,
                dateAndHour: newDate,
              }));
            }}
          />
          <input
            type="time"
            value={format(newAppointment.dateAndHour, 'HH:mm')}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              const newDate = new Date(newAppointment.dateAndHour);
              newDate.setHours(hours, minutes);
              setNewAppointment((prev) => ({
                ...prev,
                dateAndHour: newDate,
              }));
            }}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={newAppointment.description}
            onChange={(e) =>
              setNewAppointment((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <textarea
            placeholder="Notas"
            value={newAppointment.notes}
            onChange={(e) =>
              setNewAppointment((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
      <Modal
        title="Editar Agendamento"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onConfirm={handleSaveEditAppointment}
        confirmLabel="Salvar"
        cancelLabel="Fechar"
        danger={false}
      >
        {appointmentBeingEdited && (
          <div>
            {/* Campo para editar a data */}
            <input
              type="date"
              value={format(appointmentBeingEdited.dateAndHour, 'yyyy-MM-dd')} // Formato de data compatível
              onChange={(e) => {
                const [year, month, day] = e.target.value
                  .split('-')
                  .map(Number);
                const newDate = new Date(appointmentBeingEdited.dateAndHour);
                newDate.setFullYear(year, month - 1, day); // Atualizando a data
                setAppointmentBeingEdited({
                  ...appointmentBeingEdited,
                  dateAndHour: newDate,
                });
              }}
            />

            {/* Campo para editar a hora */}
            <input
              type="time"
              value={format(appointmentBeingEdited.dateAndHour, 'HH:mm')} // Formato de hora compatível
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':').map(Number);
                const newDate = new Date(appointmentBeingEdited.dateAndHour);
                newDate.setHours(hours, minutes); // Atualizando a hora
                setAppointmentBeingEdited({
                  ...appointmentBeingEdited,
                  dateAndHour: newDate,
                });
              }}
            />

            {/* Campo para editar a descrição */}
            <input
              type="text"
              placeholder="Descrição"
              value={appointmentBeingEdited.description}
              onChange={(e) =>
                setAppointmentBeingEdited({
                  ...appointmentBeingEdited,
                  description: e.target.value,
                })
              }
            />

            {/* Campo para editar as notas */}
            <textarea
              placeholder="Notas"
              value={appointmentBeingEdited.notes}
              onChange={(e) =>
                setAppointmentBeingEdited({
                  ...appointmentBeingEdited,
                  notes: e.target.value,
                })
              }
            />
          </div>
        )}
      </Modal>

      <button type="button" onClick={handleOpenNewAppointmentModal}>
        Adicionar Novo Agendamento
      </button>

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
                {/* <button
                  type="button"
                  onClick={() => handleReschedule(appointment.id)}
                >
                  Remarcar
                </button> */}
                <button
                  type="button"
                  onClick={() => handleEditAppointment(appointment)}
                >
                  Editar
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
