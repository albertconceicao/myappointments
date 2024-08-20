import styled from 'styled-components';

export const Container = styled.aside`
  background: ${({ theme }) => theme.colors.primary.lighter};
  min-width: 300px;
  min-height: 90vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;

  img {
    width: 24px;
    height: 24px;
  }
  a {
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1.2rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

export const LinkContainer = styled.div`
  a {
    width: 100%;
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
`;
export const TopLinks = styled.div``;
export const BottomLinks = styled.div``;
