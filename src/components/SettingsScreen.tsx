import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Key, ClipboardPaste, Cpu, Globe, ChevronRight } from 'lucide-react';
import { useAppStore, type AppMode, type Scenario } from '@/store/appStore';
import { toast } from 'sonner';

const scenarios: { id: Scenario; label: string; icon: string }[] = [
  { id: 'browsing', label: 'Браузинг', icon: '🌐' },
  { id: 'youtube', label: 'YouTube', icon: '▶️' },
  { id: 'chatgpt', label: 'ChatGPT', icon: '🤖' },
  { id: 'torrents', label: 'Торренты', icon: '📥' },
];

const SettingsScreen = () => {
  const {
    mode, setMode,
    scenario, setScenario,
    baseUrl, setBaseUrl,
    sessionToken, setSessionToken,
    vpnKey, setVpnKey,
    setLogMessage,
    setCurrentScreen,
  } = useAppStore();

  const [urlInput, setUrlInput] = useState(baseUrl);
  const [tokenInput, setTokenInput] = useState(sessionToken);

  const handleGetKey = () => {
    if (sessionToken || tokenInput) {
      setVpnKey('vless://mock-imported-key@server:443');
      setLogMessage('✓ Ключ получен через API');
      toast.success('Ключ успешно получен');
    } else {
      window.open('https://servervpn.store/cabinet/', '_blank');
      toast.info('Откройте личный кабинет для входа');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.startsWith('vless://')) {
        setVpnKey(text);
        setLogMessage('✓ Ключ импортирован из буфера');
        toast.success('VLESS-ключ импортирован');
      } else if (text.startsWith('http')) {
        setBaseUrl(text);
        setUrlInput(text);
        toast.success('URL сохранён');
      } else if (text.length > 20) {
        setSessionToken(text);
        setTokenInput(text);
        toast.success('Токен сохранён');
      } else {
        toast.error('В буфере нет VLESS-ссылки или токена');
      }
    } catch {
      toast.error('Не удалось прочитать буфер обмена');
    }
  };

  const handleSaveUrl = () => {
    let normalized = urlInput.trim().replace(/\/+$/, '');
    normalized = normalized.replace(/noryx\.ru|noryxvpn\.store/g, 'servervpn.store');
    if (!normalized.startsWith('http')) normalized = 'https://' + normalized;
    setBaseUrl(normalized);
    setUrlInput(normalized);
    toast.success('URL сохранён');
  };

  const handleSaveToken = () => {
    setSessionToken(tokenInput);
    toast.success('Токен сохранён');
  };

  return (
    <div className="flex flex-col h-screen h-[100dvh] bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-border bg-card">
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-9 h-9 rounded-xl flex items-center justify-center active:opacity-70"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Настройки</h1>
      </div>

      <div className="px-4 sm:px-5 py-4 space-y-6">
        {/* Access section */}
        <section>
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Доступ</h2>

          <div className="card-surface overflow-hidden">
            <div className="px-4 py-3 list-separator">
              <label className="text-xs text-muted-foreground mb-1.5 block">Base URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://servervpn.store"
                  className="flex-1 px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={handleSaveUrl}
                  className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
                >
                  ОК
                </button>
              </div>
            </div>

            <div className="px-4 py-3 list-separator">
              <label className="text-xs text-muted-foreground mb-1.5 block">Session / Bearer Token</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Вставьте токен..."
                  className="flex-1 px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={handleSaveToken}
                  className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
                >
                  ОК
                </button>
              </div>
            </div>

            <div className="flex gap-2 p-4">
              <button
                onClick={handleGetKey}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl vpn-gradient text-white text-sm font-medium active:opacity-80"
              >
                <Key className="w-4 h-4" />
                Получить ключ
              </button>
              <button
                onClick={handlePaste}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium active:opacity-80"
              >
                <ClipboardPaste className="w-4 h-4" />
                Вставить
              </button>
            </div>

            {vpnKey && (
              <div className="px-4 pb-4">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/15">
                  <p className="text-xs text-muted-foreground mb-1">Текущий ключ</p>
                  <p className="text-xs font-mono text-foreground truncate">{vpnKey}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Mode */}
        <section>
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Режим</h2>

          <div className="card-surface overflow-hidden">
            {(['autopilot', 'manual'] as AppMode[]).map((m, i) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors active:bg-secondary/50 ${
                  i < 1 ? 'list-separator' : ''
                } ${mode === m ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{m === 'autopilot' ? 'Автопилот' : 'Ручной'}</span>
                </div>
                {mode === m && (
                  <span className="text-xs text-primary font-medium">Выбран</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Scenario */}
        <section>
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Сценарий</h2>

          <div className="card-surface overflow-hidden">
            {scenarios.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors active:bg-secondary/50 ${
                  i < scenarios.length - 1 ? 'list-separator' : ''
                } ${scenario === s.id ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-sm text-foreground">{s.label}</span>
                </div>
                {scenario === s.id && (
                  <span className="text-xs text-primary font-medium">Выбран</span>
                )}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsScreen;
