import styled from 'styled-components';

export const Container = styled.aside`
  background: ${({ theme }) => theme.colors.primary.lighter};
  min-width: 18.75rem;
  min-height: 90vh;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
  a {
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1.2rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
  button {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    a {
      padding: 0.5rem 0;
      margin-top: 0;
    }
    button {
      margin-top: 0.5rem;
    }
  }
`;
export const WebContainer = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;
export const MobileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    box-shadow: unset;
  }
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 29px;
    height: 25px;
    left: 15px;
    top: 24px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: ${({ theme }) => theme.colors.primary.main};
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: ${({ theme }) => theme.colors.primary.secondary};
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: ${({ theme }) => theme.secondary};
    padding: 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: ${({ theme }) => theme.secondary};
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  @media (min-width: 1200px) {
    font-size: 20px;
  }
  @media (min-width: 768px) {
    display: none;
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
