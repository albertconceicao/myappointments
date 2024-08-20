import styled from 'styled-components';

import { IContainerProps } from '../../entities/IProfile';

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ profile }) => (profile ? 'space-between' : 'center')};
  min-height: 94px;
  padding: 20px;

  /* background: ${({ theme }) => theme.colors.primary.light}; */

  @media (max-width: 767px) {
    min-height: 50px;
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

export const Logo = styled.h2`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
`;
