import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Power, Shield, ChevronRight, ExternalLink, RefreshCw,
  Clock, MapPin, Cpu, CreditCard
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';

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
    <div className="flex flex-col min-h-screen px-5 pt-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">ServerVPN</span>
        </div>
        <button
          onClick={handleRefresh}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
        >
          <RefreshCw className={`w-4 h-4 text-secondary-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Connection Status Ring */}
      <div className="flex flex-col items-center my-8">
        <motion.div
          className={`relative w-48 h-48 rounded-full flex items-center justify-center ${
            isConnected ? 'animate-pulse-glow' : ''
          }`}
          style={{
            background: `radial-gradient(circle, hsl(var(--vpn-surface)) 60%, transparent 70%)`,
          }}
        >
          {/* Outer ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
            <circle
              cx="96" cy="96" r="90"
              fill="none"
              stroke={isConnected ? 'hsl(var(--vpn-connected))' : 'hsl(var(--border))'}
              strokeWidth="3"
              strokeDasharray={isConnected ? "565" : "8 8"}
              opacity={isConnected ? 0.6 : 0.3}
            />
          </svg>

          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={vpnStatus}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-sm font-medium mb-1 ${
                  isConnected ? 'text-primary vpn-text-glow' : 'text-muted-foreground'
                }`}
              >
                {isConnected ? 'ПОДКЛЮЧЕНО' : isTransitioning ? '...' : 'ОТКЛЮЧЕНО'}
              </motion.div>
            </AnimatePresence>

            <span className="text-3xl font-mono font-semibold tracking-wider">
              {formatTime(connectionTime)}
            </span>
          </div>
        </motion.div>

        {/* Main Action Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleMainAction}
          disabled={isTransitioning}
          className={`mt-8 w-full max-w-xs py-4 rounded-2xl font-semibold text-base transition-all ${
            isConnected
              ? 'bg-destructive text-destructive-foreground vpn-glow-danger'
              : !hasSubscription
                ? 'bg-vpn-warning text-primary-foreground'
                : 'vpn-gradient text-primary-foreground vpn-glow-sm'
          } ${isTransitioning ? 'opacity-60' : 'active:scale-[0.97]'}`}
        >
          {getMainButtonLabel()}
        </motion.button>
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
