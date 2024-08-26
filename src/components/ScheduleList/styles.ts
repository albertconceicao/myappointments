import styled from 'styled-components';

export const Container = styled.div``;

export const ScheduleTitle = styled.h2`
  margin-bottom: 1.25rem;
`;
export const ScheduleItemContainer = styled.div`
  max-width: 410px;
  background: lightblue;
  border-radius: 8px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & + & {
    margin-top: 1.25rem;
  }
`;

export const ScheduleItemTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
`;
