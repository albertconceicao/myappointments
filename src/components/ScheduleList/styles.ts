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

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  thead {
    background-color: ${({ theme }) => theme.colors.primary.main};
    opacity: 0.7;
    tr {
      th {
        padding: 1rem;
        text-align: left;
        font-weight: 500;
        font-size: 1rem;
        color: #fff;
        min-width: 8.125rem;
      }
    }
  }

  tbody {
    tr {
      &:nth-child(even) {
        background-color: ${({ theme }) => theme.colors.primary.lighter};
      }

      &:nth-child(odd) {
        /* background-color: #f9f9f9; */
      }

      td {
        padding: 0.25rem 0.5rem;
        text-align: left;
        font-size: 0.8rem;
        border-bottom: 1px solid #ddd;
      }

      .button-group {
        display: flex;
        gap: 0.25rem;
        button {
          font-size: 0.8rem;
          height: 2.25rem;
        }
      }
      td:last-child {
        text-align: right;
      }
    }
  }

  tfoot {
    background-color: #f1f1f1;

    tr {
      td {
        font-size: 1rem;
        padding: 1rem;
        text-align: right;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};

        &:first-child {
          text-align: left;
        }
      }
    }
  }
`;
