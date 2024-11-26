/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import { ICustomerProps } from '../../entities/ICustomer';
import CustomersService from '../../services/CustomersService';

import { TableContainer } from './styles';

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token') || null;
  const bearerToken: string = `Bearer ${token != null ? token : ''}`;

  const fetchCustomers = useCallback(async () => {
    if (token) {
      const customersList = await CustomersService.listCustomers('asc', {
        Authorization: bearerToken,
      });
      setCustomers(customersList);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers, token, bearerToken]);

  async function handleDeleteCustomer(id: string) {
    await CustomersService.deleteCustomer(id);
    setCustomers((prevState) => {
      const updatedCustomers = prevState.filter(
        (customer) => customer._id !== id,
      );
      return updatedCustomers;
    });
  }

  return (
    <div>
      {isLoading ? (
        <h1>Carregando pacientes...</h1>
      ) : !customers.length ? (
        <h1>Você ainda não tem clientes cadastrados</h1>
      ) : (
        <h1>Pacientes</h1>
      )}
      {token && !isLoading && (
        <TableContainer>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Editar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer: ICustomerProps) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>
                  <Link to={`/finalizar-cadastro/${customer._id}`}>
                    Editar cliente
                  </Link>
                </td>
                <td>
                  <Button
                    type="button"
                    danger
                    onClick={() => handleDeleteCustomer(customer._id)}
                  >
                    Remover cliente
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total</td>
              <td>{customers.length}</td>
            </tr>
          </tfoot>
        </TableContainer>
      )}
    </div>
  );
}
