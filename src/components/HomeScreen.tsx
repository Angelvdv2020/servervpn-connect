import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Power, Shield, ChevronRight, ExternalLink, RefreshCw,
  Clock, MapPin, Cpu, CreditCard
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import noryxLogo from '@/assets/noryx-logo.png';

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const HomeScreen = () => {
  const {
    vpnStatus, setVpnStatus,
    connectionTime, setConnectionTime,
    hasSubscription, daysLeft,
    vpnKey, setVpnKey,
    selectedServer, mode, scenario,
    logMessage, setLogMessage,
    setCurrentScreen,
  } = useAppStore();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Timer
  useEffect(() => {
    if (vpnStatus !== 'connected') return;
    const interval = setInterval(() => {
      setConnectionTime(connectionTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [vpnStatus, connectionTime, setConnectionTime]);

  const handleMainAction = useCallback(() => {
    if (!hasSubscription) {
      window.open('https://servervpn.store/ru-ru/pricing/', '_blank');
      return;
    }
    if (!vpnKey) {
      setVpnKey('vless://mock-key-imported@server:443');
      setLogMessage('✓ Ключ получен из кабинета');
      return;
    }
    if (vpnStatus === 'disconnected') {
      setVpnStatus('connecting');
      setLogMessage('Подключение...');
      setTimeout(() => {
        setVpnStatus('connected');
        setConnectionTime(0);
        setLogMessage('✓ VPN подключён');
      }, 1500);
      return;
    }
    if (vpnStatus === 'connected') {
      setVpnStatus('disconnecting');
      setLogMessage('Отключение...');
      setTimeout(() => {
        setVpnStatus('disconnected');
        setConnectionTime(0);
        setLogMessage('VPN отключён');
      }, 800);
    }
  }, [hasSubscription, vpnKey, vpnStatus, setVpnKey, setVpnStatus, setConnectionTime, setLogMessage]);

  const getMainButtonLabel = () => {
    if (!hasSubscription) return 'Оформить подписку';
    if (!vpnKey) return 'Получить ключ';
    if (vpnStatus === 'connecting') return 'Подключение...';
    if (vpnStatus === 'connected') return 'Отключить';
    if (vpnStatus === 'disconnecting') return 'Отключение...';
    return 'Подключить';
  };

  const isConnected = vpnStatus === 'connected';
  const isTransitioning = vpnStatus === 'connecting' || vpnStatus === 'disconnecting';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLogMessage('Обновление данных...');
    setTimeout(() => {
      setIsRefreshing(false);
      setLogMessage('✓ Данные обновлены');
    }, 1200);
  };

  const scenarioLabels: Record<string, string> = {
    browsing: 'Браузинг',
    youtube: 'YouTube',
    chatgpt: 'ChatGPT',
    torrents: 'Торренты',
  };

  return (
    <div className="flex flex-col min-h-screen px-5 pt-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={noryxLogo} alt="NORYX" className="w-64 object-contain" />
        </div>
        <button
          onClick={handleRefresh}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
        >
          <RefreshCw className={`w-4 h-4 text-secondary-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Animated Power Button */}
      <div className="flex flex-col items-center my-4">
        {/* Status text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={vpnStatus}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-2"
          >
            <span className="text-3xl font-mono font-semibold tracking-wider">
              {formatTime(connectionTime)}
            </span>
          </motion.div>
        </AnimatePresence>

          <motion.div
            className={`text-sm font-medium mb-4 px-4 py-1 rounded-full ${
              isConnected
                ? 'text-primary bg-primary/15 vpn-text-glow'
                : 'text-muted-foreground bg-muted/40'
            }`}
          >
            {isConnected ? 'Подключено' : isTransitioning ? 'Подключение...' : 'Отключено'}
          </motion.div>

        {/* Power button with animated rings */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulsing rings */}
          {isConnected && (
            <>
              <motion.div
                className="absolute w-52 h-52 rounded-full border-2 border-primary/20"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-44 h-44 rounded-full border-2 border-primary/30"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
            </>
          )}

          {/* Static ring */}
          <div className={`absolute w-40 h-40 rounded-full border-2 ${
            isConnected ? 'border-primary/40' : 'border-muted-foreground/15'
          }`} />

          {/* Inner glow ring */}
          <div className={`absolute w-36 h-36 rounded-full ${
            isConnected ? 'bg-primary/10' : 'bg-muted/20'
          }`} />

          {/* Main power button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleMainAction}
            disabled={isTransitioning}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all shadow-2xl ${
              isConnected
                ? 'bg-gradient-to-br from-primary to-accent vpn-glow'
                : !hasSubscription
                  ? 'bg-gradient-to-br from-vpn-warning to-vpn-warning/80'
                  : isTransitioning
                    ? 'bg-gradient-to-br from-primary/60 to-accent/60 animate-pulse'
                    : 'bg-gradient-to-br from-muted to-secondary'
            } ${isTransitioning ? 'opacity-80' : ''}`}
          >
            <Power className={`w-10 h-10 ${
              isConnected ? 'text-primary-foreground' : 'text-foreground/70'
            }`} />
          </motion.button>
        </div>

        {/* Action label below */}
        <p className="mt-6 text-xs text-muted-foreground">
          {!hasSubscription
            ? 'Нажмите для оформления подписки'
            : !vpnKey
              ? 'Нажмите для получения ключа'
              : isConnected
                ? 'Нажмите для отключения'
                : 'Нажмите для подключения'}
        </p>
      </div>

      {/* Info Cards */}
      <div className="space-y-3">
        {/* Server */}
        <button
          onClick={() => setCurrentScreen('servers')}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-card glass-border transition-colors hover:bg-secondary"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Сервер</p>
              <p className="text-sm font-medium">
                {selectedServer ? `${selectedServer.flag} ${selectedServer.name}` : 'Не выбран'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Mode */}
        <button
          onClick={() => setCurrentScreen('settings')}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-card glass-border transition-colors hover:bg-secondary"
        >
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Режим</p>
              <p className="text-sm font-medium">
                {mode === 'autopilot' ? 'Автопилот' : 'Ручной'} · {scenarioLabels[scenario]}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Subscription */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-card glass-border">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Подписка</p>
              <p className="text-sm font-medium">
                {hasSubscription ? `${daysLeft} дн. осталось` : 'Неактивна'}
              </p>
            </div>
          </div>
          {!hasSubscription && (
            <span className="text-xs text-vpn-warning font-medium px-2 py-1 rounded-md bg-vpn-warning/10">
              Требуется
            </span>
          )}
        </div>

        {/* Log */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-card glass-border">
          <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground font-mono truncate">{logMessage}</p>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 glass glass-border">
        <div className="flex justify-around py-3 max-w-lg mx-auto">
          <button
            onClick={() => window.open('https://servervpn.store/cabinet/', '_blank')}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Кабинет</span>
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <Power className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-primary font-medium">VPN</span>
          </button>
          <button
            onClick={() => setCurrentScreen('servers')}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Серверы</span>
          </button>
          <button
            onClick={() => window.open('https://servervpn.store/ru-ru/pricing/', '_blank')}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Продлить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
