import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const FormContainer = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin: 10px 0;
    font-size: 1rem;
    input {
      margin-left: 10px;
      padding: 5px;
      font-size: 1rem;
    }
  }
`;

export const ReceiptContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  background-color: #fff;

  h2 {
    text-align: center;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
  }

  ul {
    margin: 10px 0;
    padding: 0;
    list-style: none;

    li {
      font-size: 1rem;
      margin: 5px 0;
    }
  }
`;

export const ReceiptHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ReceiptBody = styled.main`
  background: #f6f6f6;
  padding: 1.5rem;
`;

export const SectionInfo = styled.section`
  margin: 1rem 0;
  p {
    font-size: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary.main};
  text-transform: uppercase;
  text-align: left !important;
`;

export const ReportHighlight = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.875rem;
  h2 {
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const ReportDescription = styled.div`
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  margin: 1rem 0;
  padding: 1rem;
`;

export const ReportDateAndCity = styled.p`
  display: flex;
  justify-content: center;
`;
export const ReceiptFooter = styled.footer`
  padding-top: 2px;
  padding: 1.5rem;
  border-top: 2px solid ${({ theme }) => theme.colors.primary.main};
`;
