import { ReactNode } from 'react';

import Button from '../Button';
import { ReactPortal } from '../ReactPortal';

import { Container, Footer, Overlay } from './styles';

interface IModalProps {
  title: string;
  danger: boolean;
  children: ReactNode;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
  isLoading: boolean;
}

export function Modal({
  title,
  children,
  danger,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
  isLoading,
}: IModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              danger={danger}
              type="button"
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
