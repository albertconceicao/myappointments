import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AppointmentsService from '../../services/AppointmentsService';
import CustomersService from '../../services/CustomersService';
import { Modal } from '../Modal';

interface IAppointment {
  _id: number;
  customerId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  dateAndHour: Date;
  description: string;
  notes: string;
}

export function ScheduleList() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
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
    _id: Date.now(),
    customerId: { _id: '', name: '', email: '', phone: '' },
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

  const fetchAppointments = useCallback(async () => {
    if (token) {
      try {
        const appointmentsList = await AppointmentsService.listAppointments({
          Authorization: bearerToken,
        });
        console.log({ appointmentsList });
        setAppointments(
          appointmentsList.map((appointment: IAppointment) => ({
            ...appointment,
            dateAndHour: format(
              new Date(appointment.date),
              'dd/MM/yyyy - HH:mm',
            ),
          })),
        );
      } catch (error) {
        toast.error('Erro ao buscar agendamentos!');
      } finally {
        setIsLoading(false);
      }
    }
  }, [token, bearerToken]);

  useEffect(() => {
    fetchCustomers();
    fetchAppointments();
  }, [fetchCustomers, fetchAppointments]);

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
      await AppointmentsService.deleteAppointment(appointmentBeingDeleted._id);

      setAppointments((prev) => {
        const updatedAppointments = prev.filter(
          (appointment) => appointment._id !== appointmentBeingDeleted?._id,
        );
        return updatedAppointments;
      });
      handleCloseDeleteModal();
      toast.success('Agendamento deletado com sucesso!');
    } catch {
      toast.warn('Ocorreu um erro ao deletar o agendamento');
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
            appointment._id === id
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
          appointment._id === appointmentBeingEdited.id
            ? {
                ...appointment, // Mantém as informações atuais
                ...appointmentBeingEdited, // Sobrescreve com as alterações feitas
              }
            : appointment,
        ),
      );
      toast.success('Consulta editada com sucesso!');
      setIsEditModalVisible(false);
    }
  }

  function handleOpenNewAppointmentModal() {
    setIsNewModalVisible(true);
  }

  function handleCloseNewAppointmentModal() {
    setIsNewModalVisible(false);
  }

  async function handleAddNewAppointment() {
    try {
      setIsLoadingDelete(true);
      const newSavedAppointment = await AppointmentsService.createAppointment({
        customerId: newAppointment.customerId._id,
        date: new Date(newAppointment.dateAndHour),
        description: newAppointment.description,
        notes: newAppointment.notes,
      });
      setAppointments((prev) => [
        ...prev,
        {
          ...newSavedAppointment,
          customerId: {
            ...newAppointment.customerId, // Usa os dados existentes do cliente
          },
        },
      ]);
      console.log({ newAppointment });
      toast.success('Novo agendamento adicionado!');
    } catch {
      toast.warn('Ocorreu um erro ao deletar o agendamento');
    } finally {
      setIsNewModalVisible(false);
      handleCloseNewAppointmentModal();
      setIsLoadingDelete(false);
    }
  }

  function syncWithCalendar(id: number) {
    alert('Sincronização em andamento');
  }
  return (
    <div>
      <Modal
        title="Adicionar Novo Agendamento"
        visible={isNewModalVisible}
        onCancel={() => setIsNewModalVisible(false)}
        onConfirm={handleAddNewAppointment}
        confirmLabel="Adicionar"
        cancelLabel="Cancelar"
      >
        <div>
          <select
            onChange={(e) => {
              const selectedCustomer = customers.find(
                (customer) => customer.name === e.target.value,
              );
              console.log(selectedCustomer);
              setNewAppointment((prev) => ({
                ...prev,
                customerId: selectedCustomer || {
                  name: '',
                  email: '',
                  phone: '',
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
            value={newAppointment.customerId.name}
            onChange={(e) =>
              setNewAppointment((prev) => ({
                ...prev,
                customer: { ...prev.customerId, name: e.target.value },
              }))
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newAppointment.customerId.email}
            onChange={(e) =>
              setNewAppointment((prev) => ({
                ...prev,
                customer: { ...prev.customerId, email: e.target.value },
              }))
            }
          />
          <input
            type="tel"
            placeholder="Telefone"
            value={newAppointment.customerId.phone}
            onChange={(e) =>
              setNewAppointment((prev) => ({
                ...prev,
                customer: { ...prev.customerId, phone: e.target.value },
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
              value={format(appointmentBeingEdited.date, 'yyyy-MM-dd')} // Formato de data compatível
              onChange={(e) => {
                const [year, month, day] = e.target.value
                  .split('-')
                  .map(Number);
                const newDate = new Date(appointmentBeingEdited.date);
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
              value={format(appointmentBeingEdited.date, 'HH:mm')} // Formato de hora compatível
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':').map(Number);
                const newDate = new Date(appointmentBeingEdited.date);
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
        title={`Tem certeza que deseja remover o agendamento de "${appointmentBeingDeleted?.customerId.name}"`}
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
            // const appointmentDate = appointment.date
            //   ? new Date(appointment.date)
            //   : null;

            <tr key={`${appointment._id}-${appointment.date || 'pending'}`}>
              <td>{appointment?.customerId?.name || 'Carregando...'}</td>
              <td>{appointment?.customerId?.email || 'Carregando...'}</td>
              <td>{appointment?.customerId?.phone || 'Carregando...'}</td>
              <td>
                {appointment.date
                  ? format(appointment.date, 'dd/MM/yyyy - HH:mm')
                  : 'Carregando...'}
              </td>
              <td>{appointment.description || 'Carregando...'}</td>
              <td>{appointment.notes || 'Carregando...'}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeleteAppointment(appointment)}
                >
                  Cancelar
                </button>
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
