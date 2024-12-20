import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { ICustomerAppointmentsProps } from '../entities/ICustomer';
import AppointmentsService from '../services/AppointmentsService';

export function useAppointments() {
  const [appointments, setAppointments] = useState<
    ICustomerAppointmentsProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      const appointmentsList = await AppointmentsService.listAppointments({
        Authorization: `Bearer ${token}`,
      });
      const formattedAppointments = appointmentsList.map(
        (appointment: ICustomerAppointmentsProps) => ({
          ...appointment,
          date: format(new Date(appointment.date), 'dd/MM/yyyy - HH:mm'),
        }),
      );
      setAppointments(formattedAppointments);
    } catch {
      toast.error('Erro ao buscar agendamentos!');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addAppointment = (newAppointment: ICustomerAppointmentsProps) => {
    setAppointments((prev) => [
      ...prev,
      {
        ...newAppointment,
        name: newAppointment.customerId.name,
        email: newAppointment.customerId.email,
        phone: newAppointment.customerId.phone,
        date: format(new Date(newAppointment.date), 'dd/MM/yyyy - HH:mm'),
      },
    ]);
  };

  const updateAppointment = (
    updatedAppointment: ICustomerAppointmentsProps,
  ) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment._id === updatedAppointment._id
          ? {
              ...appointment,
              ...updatedAppointment,
              date: format(
                new Date(updatedAppointment.date),
                'dd/MM/yyyy - HH:mm',
              ),
            }
          : appointment,
      ),
    );
  };

  const deleteAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment._id !== appointmentId),
    );
  };

  return {
    appointments,
    isLoading,
    fetchAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
}
