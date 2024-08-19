import { IFormDataProps } from '../pages/SignUp';

import HttpClient from './utils/httpClient';

class CustomersService {
  HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3000');
  }

  async listCustomers(orderBy = 'asc') {
    return this.HttpClient.get(`/customers/?orderBy=${orderBy}`);
  }

  async createCustomer(customer: IFormDataProps) {
    return this.HttpClient.post('/customers', { body: customer });
  }
}

export default new CustomersService();
