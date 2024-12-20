import HttpClient from './utils/httpClient';

class PaymentsService {
  HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3000');
  }

  // eslint-disable-next-line default-param-last
  async listPendingPayments(headers: Record<string, string>) {
    return this.HttpClient.get(`/payments/report`, {
      headers,
    });
  }

  async listPaymentssByCustomer(
    customerId: string,
    headers: Record<string, string>,
  ) {
    return this.HttpClient.get(`/customers/${customerId}/Paymentss/`, {
      headers,
    });
  }

  async getPaymentsById(id: string) {
    return this.HttpClient.get(`/Paymentss/${id}`);
  }

  async createPayments(customer: ICustomerPaymentsProps) {
    return this.HttpClient.post('/payments', { body: customer });
  }

  async updatePayments(PaymentsId: string, customer: ICustomerPaymentsProps) {
    return this.HttpClient.put(`/payments/${PaymentsId}`, {
      body: customer,
    });
  }

  async deletePayments(id: string) {
    return this.HttpClient.delete(`/payments/${id}`);
  }
}

export default new PaymentsService();
