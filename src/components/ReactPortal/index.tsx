import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IReactPortalProps {
  containerId: string;
  children: ReactNode;
}

export function ReactPortal({ containerId, children }: IReactPortalProps) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }
  return ReactDOM.createPortal(children, container);
}
