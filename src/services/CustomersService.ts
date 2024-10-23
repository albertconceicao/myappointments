import { ICustomerLoginProps, ICustomerProps } from '../entities/ICustomer';

import HttpClient from './utils/httpClient';

class CustomersService {
  HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3000');
  }

  // eslint-disable-next-line default-param-last
  async listCustomers(orderBy = 'asc', headers: Record<string, string>) {
    return this.HttpClient.get(`/customers/?orderBy=${orderBy}`, {
      headers,
    });
  }

  async getCustomerById(id: string) {
    return this.HttpClient.get(`/customers/${id}`);
  }

  async createCustomer(customer: ICustomerProps) {
    return this.HttpClient.post('/customers', { body: customer });
  }

  async updateCustomer(id: string, customer: ICustomerProps) {
    return this.HttpClient.put(`/customers/${id}`, { body: customer });
  }

  async customerLogin(customer: ICustomerLoginProps) {
    return this.HttpClient.post('/login', { body: customer });
  }

  async deleteCustomer(id: string) {
    return this.HttpClient.delete(`/customers/${id}`);
  }
}

export default new CustomersService();
