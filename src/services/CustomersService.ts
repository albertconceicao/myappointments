import { ICustomerLoginProps, ICustomerProps } from '../entities/ICustomer';

import HttpClient from './utils/httpClient';

class CustomersService {
  HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3000');
  }

  async listCustomers(
    // eslint-disable-next-line default-param-last
    orderBy = 'asc',
    headers: Record<string, string>,
  ) {
    return this.HttpClient.get(`/customers/?orderBy=${orderBy}`, {
      headers,
    }).catch((error) => console.log(error));
  }

  async getCustomerById(id: string) {
    return this.HttpClient.get(`/customers/${id}`);
  }

  async createCustomer(
    customer: ICustomerProps,
    headers: Record<string, string>,
  ) {
    return this.HttpClient.post('/customers', {
      headers,
      body: customer,
    });
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
