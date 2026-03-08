import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Power, ChevronRight, ExternalLink, RefreshCw,
  Clock, MapPin, Cpu, CreditCard, Settings
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
    <div className="flex flex-col h-screen h-[100dvh] px-4 sm:px-5 pt-4 pb-24 relative z-10 bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentScreen('settings')}
          className="w-10 h-10 rounded-xl flex items-center justify-center active:opacity-70 transition-opacity"
        >
          <Settings className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="w-10 h-10 rounded-xl flex items-center justify-center active:opacity-70 transition-opacity"
          >
            <RefreshCw className={`w-5 h-5 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Power Button Area */}
      <div className="flex flex-col items-center flex-1">
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Power button with neumorphic rings */}
          <div className="relative flex items-center justify-center">
            {/* Outer pulsing rings when connected */}
            {isConnected && (
              <>
                <motion.div
                  className="absolute w-56 h-56 rounded-full border-2 border-primary/30"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute w-48 h-48 rounded-full border-2 border-primary/25"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
              </>
            )}

            {/* Static outer ring - neumorphic */}
            <div
              className="absolute w-44 h-44 rounded-full"
              style={{
                background: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)',
                boxShadow: isConnected
                  ? '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9), 0 0 30px rgba(46,211,154,0.15)'
                  : '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9)',
              }}
            />

            {/* Inner ring */}
            <div
              className="absolute w-38 h-38 rounded-full"
              style={{
                width: '152px',
                height: '152px',
                background: 'linear-gradient(145deg, #e8e8e8, #f8f8f8)',
                boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.05), inset -4px -4px 8px rgba(255,255,255,0.8)',
              }}
            />

            {/* Main power button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleMainAction}
              disabled={isTransitioning}
              className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                isTransitioning ? 'opacity-80 animate-pulse' : ''
              }`}
              style={{
                background: isConnected
                  ? 'radial-gradient(circle, #2ED39A, #19A979)'
                  : !hasSubscription
                    ? 'linear-gradient(135deg, hsl(38,92%,50%), hsl(38,80%,40%))'
                    : isTransitioning
                      ? 'radial-gradient(circle, rgba(46,211,154,0.6), rgba(25,169,121,0.6))'
                      : 'linear-gradient(145deg, #f0f0f0, #dcdcdc)',
                boxShadow: isConnected
                  ? '0 0 40px rgba(46,211,154,0.45), 4px 4px 10px rgba(0,0,0,0.1)'
                  : '6px 6px 14px rgba(0,0,0,0.1), -6px -6px 14px rgba(255,255,255,0.9)',
              }}
            >
              <Power className={`w-12 h-12 ${
                isConnected ? 'text-white' : 'text-muted-foreground'
              }`} />
            </motion.button>
          </div>
        </div>

        {/* Status + Timer below button */}
        <div className="flex flex-col items-center mt-6 mb-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={vpnStatus}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-2xl font-mono font-semibold tracking-wider text-foreground"
            >
              {formatTime(connectionTime)}
            </motion.span>
          </AnimatePresence>
          <span className={`text-sm font-medium mt-1 ${
            isConnected ? 'text-vpn-connected' : 'text-muted-foreground'
          }`}>
            {isConnected ? 'Подключено' : isTransitioning ? 'Подключение...' : 'Отключено'}
          </span>
        </div>

        {/* Action hint */}
        <p className="text-xs text-muted-foreground mb-4">
          {!hasSubscription
            ? 'Нажмите для оформления подписки'
            : !vpnKey
              ? 'Нажмите для получения ключа'
              : isConnected
                ? 'Нажмите для отключения'
                : 'Нажмите для подключения'}
        </p>
      </div>

      {/* Info List — clean rows with separators */}
      <div className="card-surface overflow-hidden">
        {/* Server */}
        <button
          onClick={() => setCurrentScreen('servers')}
          className="w-full flex items-center justify-between px-4 py-3.5 list-separator active:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">
              {selectedServer ? `${selectedServer.flag} ${selectedServer.name}` : 'Сервер не выбран'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
        </button>

        {/* Mode */}
        <button
          onClick={() => setCurrentScreen('settings')}
          className="w-full flex items-center justify-between px-4 py-3.5 list-separator active:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">
              {mode === 'autopilot' ? 'Автопилот' : 'Ручной'} · {scenarioLabels[scenario]}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
        </button>

        {/* Subscription */}
        <div className="flex items-center justify-between px-4 py-3.5 list-separator">
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">
              {hasSubscription ? `Подписка · ${daysLeft} дн.` : 'Подписка неактивна'}
            </span>
          </div>
          {!hasSubscription && (
            <span className="text-xs text-vpn-warning font-medium">Требуется</span>
          )}
        </div>

        {/* Log */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Clock className="w-3.5 h-3.5 shrink-0 text-muted-foreground/50" />
          <p className="text-xs font-mono truncate text-muted-foreground">{logMessage}</p>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border" style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        <div className="flex justify-around py-3 max-w-lg lg:max-w-xl mx-auto">
          <button
            onClick={() => window.open('https://servervpn.store/cabinet/', '_blank')}
            className="flex flex-col items-center gap-1 px-4 py-1 active:opacity-70 transition-opacity"
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Кабинет</span>
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex flex-col items-center gap-1 px-4 py-1 active:opacity-70 transition-opacity"
          >
            <Power className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-primary font-medium">VPN</span>
          </button>
          <button
            onClick={() => setCurrentScreen('servers')}
            className="flex flex-col items-center gap-1 px-4 py-1 active:opacity-70 transition-opacity"
          >
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Серверы</span>
          </button>
          <button
            onClick={() => window.open('https://servervpn.store/ru-ru/pricing/', '_blank')}
            className="flex flex-col items-center gap-1 px-4 py-1 active:opacity-70 transition-opacity"
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
