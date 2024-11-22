import {
  ICustomerAppointmentsProps,
  ICustomerProps,
} from '../entities/ICustomer';

import HttpClient from './utils/httpClient';

class AppointmentsService {
  HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3000');
  }

  // eslint-disable-next-line default-param-last
  async listAppointments(headers: Record<string, string>) {
    return this.HttpClient.get(`/appointments`, {
      headers,
    });
  }

  async listAppointmentsByCustomer(
    customerId: string,
    headers: Record<string, string>,
  ) {
    return this.HttpClient.get(`/customers/${customerId}/appointments/`, {
      headers,
    });
  }

  async getAppointmentById(id: string) {
    return this.HttpClient.get(`/appointments/${id}`);
  }

  async createAppointment(customer: ICustomerAppointmentsProps) {
    return this.HttpClient.post('/appointments', { body: customer });
  }

  async updateAppointment(id: string, customer: ICustomerProps) {
    return this.HttpClient.put(`/appointments/${id}`, { body: customer });
  }

  async deleteAppointment(id: string) {
    return this.HttpClient.delete(`/appointments/${id}`);
  }
}

export default new AppointmentsService();
