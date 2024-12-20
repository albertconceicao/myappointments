import { IDoctorLoginProps, IDoctorProps } from '../entities/IDoctor';

import HttpClient from './utils/httpClient';

class DoctorsService {
  HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3000');
  }

  // eslint-disable-next-line default-param-last

  async createDoctor(doctor: IDoctorProps) {
    return this.HttpClient.post('/doctors', { body: doctor });
  }

  async updateDoctor(id: string, doctor: IDoctorProps) {
    return this.HttpClient.put(`/doctors/${id}`, { body: doctor });
  }

  async doctorLogin(doctor: IDoctorLoginProps) {
    return this.HttpClient.post('/login', { body: doctor });
  }

  async deleteDoctorAccount(id: string) {
    return this.HttpClient.delete(`/doctors/${id}`);
  }
}

export default new DoctorsService();
