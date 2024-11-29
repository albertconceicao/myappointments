import { IPendingPaymentsProps } from '../../entities/IPayments';

import { PendingPaymentItem } from './style';

export function PendingPayment({
  name,
  paymentType,
  total,
}: IPendingPaymentsProps) {
  const translatedPaymentType =
    paymentType === 'per_session' ? 'Por sessão' : 'Mensal';
  return (
    <PendingPaymentItem>
      <span>Cliente: {name}</span>
      <span>Tipo de pagamento: {translatedPaymentType}</span>
      <span>Total pendente: {total}</span>
    </PendingPaymentItem>
  );
}
