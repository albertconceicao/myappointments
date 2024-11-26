import { format, isValid } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AppointmentsService from '../../services/AppointmentsService';
import CustomersService from '../../services/CustomersService';
import Button from '../Button';
import Input from '../Input';
import { Modal } from '../Modal';
import { ModalForm } from '../Modal/styles';
import Select from '../Select';

import { TableContainer } from './styles';

interface IAppointment {
  _id: number;
  customerId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  date: Date;
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
    date: new Date(),
    description: '',
    notes: '',
  });
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem('token') || null;
  const bearerToken: string = `Bearer ${token != null ? token : ''}`;

  function convertToValidDate(dateString: string): Date | null {
    const [datePart, timePart] = dateString.split(' - ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    const date = new Date(year, month - 1, day, hours, minutes);

    return isValid(date) ? date : null;
  }

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
            date: format(new Date(appointment.date), 'dd/MM/yyyy - HH:mm'), // Exibe no formato desejado
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

  function handleEditAppointment(appointment: IAppointment) {
    console.log({ appointment });
    const updatedAppointment = {
      ...appointment,
      date: convertToValidDate(appointment.date),
    };
    console.log({ updatedAppointment });
    setAppointmentBeingEdited(updatedAppointment);
    setIsEditModalVisible(true);
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
        date: newAppointment.date.toISOString(),
        description: newAppointment.description,
        notes: newAppointment.notes,
      });
      setAppointments((prev) => [
        ...prev,
        {
          ...newSavedAppointment,
          date: format(
            new Date(newSavedAppointment.date),
            'dd/MM/yyyy - HH:mm',
          ),
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
  async function handleSaveEditAppointment() {
    if (appointmentBeingEdited) {
      try {
        setIsLoadingDelete(true);
        const { _id, date, description, notes } = appointmentBeingEdited;
        const appointmentBeingUploaded =
          await AppointmentsService.updateAppointment(_id, {
            date,
            description,
            notes,
          });

        console.log({ appointmentBeingUploaded });
        setAppointments((prev) =>
          prev.map(
            (appointment) =>
              appointment._id === appointmentBeingUploaded._id
                ? {
                    ...appointment, // Mantém as outras propriedades do agendamento (como customerId)
                    date: format(
                      new Date(appointmentBeingUploaded.date),
                      'dd/MM/yyyy - HH:mm',
                    ), // Atualiza apenas a data e hora
                    description: appointmentBeingUploaded.description, // Atualiza descrição
                    notes: appointmentBeingUploaded.notes, // Atualiza notas
                  }
                : appointment, // Para os outros agendamentos, mantém inalterado
          ),
        );

        console.log({ appointmentBeingEdited });
        toast.success('Consulta editada com sucesso!');
      } catch {
        toast.warn('Ocorreu um erro ao atualizar o agendamento');
      } finally {
        setIsNewModalVisible(false);
        setIsLoadingDelete(false);
      }
      setIsEditModalVisible(false);
    }
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

  return (
    <div>
      <Modal
        title="Adicionar Novo Agendamento"
        visible={isNewModalVisible}
        onCancel={() => setIsNewModalVisible(false)}
        onConfirm={handleAddNewAppointment}
        confirmLabel="Adicionar"
        cancelLabel="Cancelar"
        isLoading={isLoadingDelete}
      >
        <ModalForm>
          <Select
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
          </Select>
          <Input
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
          <Input
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
          <Input
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
          <Input
            type="date"
            value={format(newAppointment.date, 'yyyy-MM-dd')}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split('-').map(Number);
              const newDate = new Date(newAppointment.date);
              newDate.setFullYear(year, month - 1, day);
              setNewAppointment((prev) => ({
                ...prev,
                date: newDate,
              }));
            }}
          />
          <Input
            type="time"
            value={format(newAppointment.date, 'HH:mm')}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              const newDate = new Date(newAppointment.date);
              newDate.setHours(hours, minutes);
              setNewAppointment((prev) => ({
                ...prev,
                date: newDate,
              }));
            }}
          />
          <Input
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
        </ModalForm>
      </Modal>
      <Modal
        title="Editar Agendamento"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onConfirm={handleSaveEditAppointment}
        confirmLabel="Salvar"
        cancelLabel="Fechar"
        danger={false}
        isLoading={isLoadingDelete}
      >
        {appointmentBeingEdited && (
          <ModalForm>
            {/* Campo para editar a data */}
            <Input
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
                  date: newDate,
                });
              }}
            />

            {/* Campo para editar a hora */}
            <Input
              type="time"
              value={format(appointmentBeingEdited.date, 'HH:mm')} // Formato de hora compatível
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':').map(Number);
                const newDate = new Date(appointmentBeingEdited.date);
                newDate.setHours(hours, minutes); // Atualizando a hora
                setAppointmentBeingEdited({
                  ...appointmentBeingEdited,
                  date: newDate,
                });
              }}
            />

            {/* Campo para editar a descrição */}
            <Input
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
          </ModalForm>
        )}
      </Modal>

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
      <Button type="button" onClick={handleOpenNewAppointmentModal}>
        Adicionar Novo Agendamento
      </Button>
      <TableContainer>
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
            <tr key={`${appointment._id}-${appointment.date || 'pending'}`}>
              <td>{appointment?.customerId?.name || 'Carregando...'}</td>
              <td>{appointment?.customerId?.email || 'Carregando...'}</td>
              <td>{appointment?.customerId?.phone || 'Carregando...'}</td>
              <td>{appointment.date}</td>
              <td>{appointment.description || 'Carregando...'}</td>
              <td>{appointment.notes || 'Carregando...'}</td>
              <td className="button-group">
                <Button
                  type="button"
                  danger
                  onClick={() => handleDeleteAppointment(appointment)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={() => handleEditAppointment(appointment)}
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  onClick={() => syncWithCalendar(appointment.id)}
                >
                  Sincronizar Calendário
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
}
