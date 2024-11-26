import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div<{ danger: boolean }>`
  width: 100%;
  max-width: 600px;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);

  > h1 {
    font-size: 22px;
    color: ${({ theme, danger }) =>
      danger ? theme.colors.danger.main : theme.colors.gray[900]};
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const ModalForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  textarea {
    grid-column: 1 / 3;
    width: 100%;
    height: 120px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray[100]};
    resize: vertical;
  }
`;

export const Footer = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
