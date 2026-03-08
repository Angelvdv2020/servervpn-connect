import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Zap, Check } from 'lucide-react';
import { useAppStore, mockServers } from '@/store/appStore';

const ServersScreen = () => {
  const { selectedServer, setSelectedServer, setMode, setCurrentScreen } = useAppStore();
  const [search, setSearch] = useState('');

  const filtered = mockServers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
  );

  const fastServers = filtered.filter((s) => s.isFast);
  const allServers = filtered;

  const handleSelect = (server: typeof mockServers[0]) => {
    setSelectedServer(server);
    setMode('manual');
    setCurrentScreen('home');
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
        <h1 className="text-xl font-bold">Серверы</h1>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск серверов..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Fast Servers */}
      {fastServers.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Быстрые</h2>
          </div>
          <div className="space-y-2">
            {fastServers.map((server, i) => (
              <motion.button
                key={server.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleSelect(server)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                  selectedServer?.id === server.id
                    ? 'bg-primary/10 border border-primary/30'
                    : 'bg-card glass-border hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{server.flag}</span>
                  <div className="text-left">
                    <p className="text-sm font-medium">{server.name}</p>
                    <p className="text-xs text-muted-foreground">{server.country} · {server.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {server.ping && (
                    <span className="text-xs text-muted-foreground font-mono">{server.ping}ms</span>
                  )}
                  {selectedServer?.id === server.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* All Servers */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Все серверы</h2>
        <div className="space-y-2">
          {allServers.map((server, i) => (
            <motion.button
              key={server.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => handleSelect(server)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                selectedServer?.id === server.id
                  ? 'bg-primary/10 border border-primary/30'
                  : 'bg-card glass-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{server.flag}</span>
                <div className="text-left">
                  <p className="text-sm font-medium">{server.name}</p>
                  <p className="text-xs text-muted-foreground">{server.country} · {server.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {server.ping && (
                  <span className="text-xs text-muted-foreground font-mono">{server.ping}ms</span>
                )}
                {selectedServer?.id === server.id && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {allServers.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Серверы не найдены</p>
        </div>
      )}
    </div>
  );
};

export default ServersScreen;
