/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export function InstallationButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  console.log(deferredPrompt);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    console.log('here');
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) return;

    (deferredPrompt as any).prompt();
    const { outcome } = await (deferredPrompt as any).userChoice;

    if (outcome === 'accepted') {
      console.log('Usuário aceitou a instalação');
    } else {
      console.log('Usuário rejeitou a instalação');
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  }
  return (
    isInstallable && (
      <button type="button" onClick={handleInstallClick}>
        Instalar Aplicativo
      </button>
    )
  );
}
