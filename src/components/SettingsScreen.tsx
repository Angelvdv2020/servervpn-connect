import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Key, ClipboardPaste, Cpu, Globe, Settings2 } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen px-5 pt-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-secondary-foreground" />
        </button>
        <h1 className="text-xl font-bold">Настройки</h1>
      </div>

      <div className="space-y-6">
        {/* Access section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Settings2 className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Доступ</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Base URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://servervpn.store"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-card glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={handleSaveUrl}
                  className="px-4 py-2.5 rounded-xl bg-secondary text-sm font-medium text-secondary-foreground"
                >
                  ОК
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Session / Bearer Token</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Вставьте токен..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-card glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={handleSaveToken}
                  className="px-4 py-2.5 rounded-xl bg-secondary text-sm font-medium text-secondary-foreground"
                >
                  ОК
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleGetKey}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl vpn-gradient text-primary-foreground text-sm font-medium"
              >
                <Key className="w-4 h-4" />
                Получить ключ
              </button>
              <button
                onClick={handlePaste}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium"
              >
                <ClipboardPaste className="w-4 h-4" />
                Вставить ссылку
              </button>
            </div>

            {vpnKey && (
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Текущий ключ</p>
                <p className="text-xs font-mono text-foreground truncate">{vpnKey}</p>
              </div>
            )}
          </div>
        </section>

        {/* Mode */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Режим</h2>
          </div>

          <div className="flex gap-2 mb-4">
            {(['autopilot', 'manual'] as AppMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                  mode === m
                    ? 'vpn-gradient text-primary-foreground vpn-glow-sm'
                    : 'bg-card glass-border text-muted-foreground'
                }`}
              >
                {m === 'autopilot' ? 'Автопилот' : 'Ручной'}
              </button>
            ))}
          </div>
        </section>

        {/* Scenario */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Сценарий</h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {scenarios.map((s) => (
              <motion.button
                key={s.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setScenario(s.id)}
                className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all ${
                  scenario === s.id
                    ? 'bg-primary/10 border border-primary/30 text-foreground'
                    : 'bg-card glass-border text-muted-foreground'
                }`}
              >
                <span className="text-lg">{s.icon}</span>
                {s.label}
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsScreen;
