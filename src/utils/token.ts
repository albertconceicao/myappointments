import { ICustomerProps } from '../entities/ICustomer';
import CustomersService from '../services/CustomersService';

async function requestToken(customer: ICustomerProps) {
  const { data } = await CustomersService.customerLogin(customer);
  localStorage.setItem('token', data.token);
  return data.token;
}

export async function saveTokenAtLocalStorage(customer: ICustomerProps) {
  const token = localStorage.getItem('token') || null;

  if (!token || token === null) {
    requestToken(customer);
  }
  const bearerToken: string = `Bearer ${
    token != null ? token : await requestToken(customer)
  }`;

  return bearerToken;
}
// const customers = await CustomersService.listCustomers('asc', {
//   Authorization: bearerToken,
// });
