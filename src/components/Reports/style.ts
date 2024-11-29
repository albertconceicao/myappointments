import styled from 'styled-components';

export const ReportsContainer = styled.div`
  padding: 1rem;
`;

export const PendingPaymentsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const PendingPaymentItem = styled.div`
  border-radius: 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  padding: 0.875rem;
`;
