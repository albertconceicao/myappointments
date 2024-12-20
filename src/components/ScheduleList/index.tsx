/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '../../contexts/AuthContext';
import {
  ICustomerAppointmentsDraftProps,
  ICustomerAppointmentsProps,
} from '../../entities/ICustomer';
import { useAppointments } from '../../hooks/useAppointments';
import AppointmentsService from '../../services/AppointmentsService';
import CustomersService from '../../services/CustomersService';
import Button from '../Button';
import { Modal } from '../Modal';

import { AppointmentForm } from './AppointmentForm';
import { TableContainer } from './styles';

export function ScheduleList() {
  const { token } = useAuth();
  const {
    appointments,
    isLoading,
    fetchAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointments();

  const [customers, setCustomers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointmentDraft, setAppointmentDraft] =
    useState<ICustomerAppointmentsDraftProps>({
      customerId: {
        name: '',
        email: '',
        phone: '',
      },
      date: new Date(),
      description: '',
      notes: '',
    });
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete'>(
    'create',
  );

  useEffect(() => {
    if (token) {
      CustomersService.listCustomers('asc', {
        Authorization: `Bearer ${token}`,
      }).then(setCustomers);
      fetchAppointments(token);
    }
  }, [token, fetchAppointments]);

  function openModal(
    type: 'create' | 'edit' | 'delete',
    appointment: ICustomerAppointmentsProps | null = null,
  ) {
    setModalType(type);

    if (type === 'edit' || type === 'delete') {
      const [datePart, timePart] = appointment.date.split(' - ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);

      setAppointmentDraft({
        ...appointment,
        date: new Date(year, month - 1, day, hours, minutes),
      });
    } else {
      setAppointmentDraft({
        customerId: null,
        date: new Date(),
        description: '',
        notes: '',
      });
    }

    setIsModalVisible(true);
  }

  async function handleSaveOrUpdateAppointment() {
    const { customerId, date, description, notes } = appointmentDraft;

    const appointmentData = {
      customerId: customerId ? customerId._id : null,
      date: date.toISOString(),
      description,
      notes,
    };

    try {
      const fullCustomer = customers.find(
        (customer) => customer._id === customerId._id,
      );
      if (modalType === 'edit') {
        if (appointmentDraft._id) {
          const updatedAppointment =
            await AppointmentsService.updateAppointment(
              appointmentDraft._id,
              appointmentData,
            );

          const completeAppointment = {
            ...updatedAppointment,
            customerId: {
              ...fullCustomer,
            },
          };
          updateAppointment(completeAppointment);
          toast.success('Agendamento atualizado com sucesso!');
        } else {
          toast.error('Erro: ID do agendamento não encontrado.');
        }
      } else {
        const bearerToken = `Bearer ${token}`;
        const newAppointment = await AppointmentsService.createAppointment(
          appointmentData,
          {
            Authorization: bearerToken,
          },
        );

        const completeAppointment = {
          ...newAppointment,
          customerId: {
            ...fullCustomer,
          },
        };

        addAppointment(completeAppointment);
        toast.success('Agendamento criado com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao salvar agendamento.');
    } finally {
      setIsModalVisible(false);
    }
  }

  async function handleDeleteAppointment() {
    try {
      if (appointmentDraft._id) {
        await AppointmentsService.deleteAppointment(appointmentDraft._id);
        deleteAppointment(appointmentDraft._id);
        toast.success('Agendamento excluído com sucesso!');
      } else {
        toast.error('Erro: ID do agendamento não encontrado.');
      }
    } catch {
      toast.error('Erro ao excluir agendamento.');
    } finally {
      setIsModalVisible(false);
    }
  }

  return (
    <div>
      <h2>Gerenciamento de Consultas</h2>
      <Button type="button" onClick={() => openModal('create')}>
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
          {appointments.map((appointment: ICustomerAppointmentsProps) => (
            <tr key={appointment._id}>
              <td>{appointment.customerId.name}</td>
              <td>{appointment.customerId.email}</td>
              <td>{appointment.customerId.phone}</td>
              <td>
                {typeof appointment.date === 'string'
                  ? appointment.date
                  : appointment.date.toISOString()}
              </td>
              <td>{appointment.description}</td>
              <td>{appointment.notes}</td>
              <td className="button-group">
                <Button
                  type="button"
                  onClick={() => openModal('edit', appointment)}
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  danger
                  onClick={() => openModal('delete', appointment)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={
          modalType === 'delete'
            ? handleDeleteAppointment
            : handleSaveOrUpdateAppointment
        }
        title={
          modalType === 'create'
            ? 'Novo Agendamento'
            : modalType === 'edit'
            ? 'Editar Agendamento'
            : 'Excluir Agendamento'
        }
        confirmLabel={
          modalType === 'delete'
            ? 'Excluir'
            : modalType === 'edit'
            ? 'Salvar'
            : 'Adicionar'
        }
        cancelLabel="Cancelar"
        isLoading={isLoading}
        danger={modalType === 'delete'}
      >
        {modalType !== 'delete' && (
          <AppointmentForm
            customers={customers}
            appointment={appointmentDraft}
            onFieldChange={(field, value) =>
              setAppointmentDraft((prev) => ({ ...prev, [field]: value }))
            }
          />
        )}
        {modalType === 'delete' && (
          <p>
            Tem certeza que deseja excluir este agendamento de &quot;
            {appointmentDraft.customerId
              ? appointmentDraft.customerId.name
              : 'Cliente desconhecido'}
            &quot;?
          </p>
        )}
      </Modal>
    </div>
  );
}
