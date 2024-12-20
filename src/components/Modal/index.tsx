import { ReactNode } from 'react';

import Button from '../Button';
import { ReactPortal } from '../ReactPortal';

import { Container, Footer, Overlay } from './styles';

interface IModalProps {
  title: string;
  danger?: boolean;
  children: ReactNode; // Conteúdo dinâmico passado como children
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void; // Callback para cancelar o modal
  onConfirm: () => void;
  visible: boolean;
  isLoading?: boolean;
}

export function Modal({
  title,
  danger = false,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
  isLoading = false,
}: IModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container
          danger={danger}
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-body"
          aria-hidden={!visible}
        >
          <h1 id="modal-title">{title}</h1>
          <div id="modal-body" className="modal-body">
            {children}
          </div>
          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
              aria-label={cancelLabel}
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
