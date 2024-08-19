import { ICustomerLoginProps, ICustomerProps } from '../entities/ICustomer';

import HttpClient from './utils/httpClient';

class CustomersService {
  HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3000');
  }

  async listCustomers(orderBy = 'asc', headers: Record<string, string>) {
    return this.HttpClient.get(`/customers/?orderBy=${orderBy}`, {
      headers,
    });
  }

  async createCustomer(customer: ICustomerProps) {
    return this.HttpClient.post('/customers', { body: customer });
  }

  async customerLogin(customer: ICustomerLoginProps) {
    return this.HttpClient.post('/login', { body: customer });
  }
}

export default new CustomersService();
