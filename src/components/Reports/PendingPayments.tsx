import { useCallback, useEffect, useState } from 'react';

import { IPendingPaymentsProps } from '../../entities/IPayments';
import PaymentsService from '../../services/PaymentsService';

import { PendingPayment } from './PendingPayment';
import { PendingPaymentsContainer } from './style';

export function PendingPayments() {
  const [pendingPayments, setPendingPayments] = useState<
    IPendingPaymentsProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token') || null;
  const bearerToken: string = `Bearer ${token != null ? token : ''}`;

  const fetchPendingPayments = useCallback(async () => {
    if (token) {
      const pendingPaymentsList = await PaymentsService.listPendingPayments({
        Authorization: bearerToken,
      });
      setPendingPayments(pendingPaymentsList);
      console.log({ pendingPaymentsList });
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchPendingPayments();
  }, [fetchPendingPayments, token, bearerToken]);

  return (
    <PendingPaymentsContainer>
      {pendingPayments.map((payment) => (
        <PendingPayment
          key={payment.customerId}
          customerId={payment.customerId}
          name={payment.name}
          email={payment.email}
          paymentType={payment.paymentType}
          total={payment.total}
        />
      ))}
    </PendingPaymentsContainer>
  );
}
