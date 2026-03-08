import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share, MoreVertical, CheckCircle } from 'lucide-react';

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setIsInstalled(true));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="h-screen h-[100dvh] flex flex-col items-center justify-center bg-background px-6 text-center">
        <CheckCircle className="w-16 h-16 text-vpn-connected mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Приложение установлено!</h1>
        <p className="text-muted-foreground">Откройте ServerVPN с главного экрана</p>
      </div>
    );
  }

  return (
    <div className="h-screen h-[100dvh] flex flex-col items-center justify-center bg-background px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center max-w-sm"
      >
        <img src="/pwa-icon-512.png" alt="ServerVPN" className="w-24 h-24 mb-6 rounded-2xl shadow-lg" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Установить ServerVPN</h1>
        <p className="text-muted-foreground mb-8">
          Установите приложение на главный экран для быстрого доступа
        </p>

        {isIOS ? (
          <div className="card-surface p-5 text-left space-y-4">
            <p className="text-sm font-medium text-foreground">Для установки на iPhone:</p>
            <div className="flex items-center gap-3">
              <Share className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">Нажмите кнопку «Поделиться»</span>
            </div>
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">Выберите «На экран Домой»</span>
            </div>
          </div>
        ) : deferredPrompt ? (
          <button
            onClick={handleInstall}
            className="w-full py-4 rounded-2xl text-white font-semibold text-lg vpn-gradient vpn-glow-sm active:opacity-90 transition-opacity"
          >
            Установить
          </button>
        ) : (
          <div className="card-surface p-5 text-left space-y-4">
            <p className="text-sm font-medium text-foreground">Для установки:</p>
            <div className="flex items-center gap-3">
              <MoreVertical className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">Откройте меню браузера (⋮)</span>
            </div>
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">Выберите «Установить приложение»</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Install;
