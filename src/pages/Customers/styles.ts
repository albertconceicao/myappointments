import styled from 'styled-components';

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
        font-size: 1.25rem;
        color: #fff;
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
        padding: 0.25rem 1rem;
        text-align: left;
        font-size: 0.9rem;
        border-bottom: 1px solid #ddd;
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
