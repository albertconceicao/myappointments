/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export function InstallationButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault(); // Evita que o navegador exiba automaticamente o prompt de instalação
      setDeferredPrompt(e);
      setIsInstallable(true); // Habilita o botão de instalação
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) return;

    (deferredPrompt as any).prompt(); // Exibe o prompt de instalação
    const { outcome } = await (deferredPrompt as any).userChoice;

    if (outcome === 'accepted') {
      console.log('Usuário aceitou a instalação');
    } else {
      console.log('Usuário rejeitou a instalação');
    }

    setDeferredPrompt(null);
    setIsInstallable(false); // Desativa o botão após o uso
  }
  return (
    <div>
      {isInstallable && (
        <button
          type="button"
          onClick={handleInstallClick}
          style={{ display: 'block', margin: '20px auto' }}
        >
          Instalar Aplicativo
        </button>
      )}
    </div>
  );
}
