import { Link as NavLink } from 'react-router-dom';

import { ILinkProps } from '../../entities/ISidebar';

import { LinkContainer } from './styles';

export function LinkItem({ path, name, icon }: ILinkProps) {
  return (
    <LinkContainer>
      <NavLink to={path}>
        <img src={`./${icon}.svg`} alt="Name" />
        {name}
      </NavLink>
    </LinkContainer>
  );
}
