import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Zap, ChevronRight } from 'lucide-react';
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

  const handleSelect = (server: typeof mockServers[0]) => {
    setSelectedServer(server);
    setMode('manual');
    setCurrentScreen('home');
  };

  const ServerRow = ({ server, index }: { server: typeof mockServers[0]; index: number }) => {
    const isSelected = selectedServer?.id === server.id;
    return (
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03 }}
        onClick={() => handleSelect(server)}
        className={`w-full flex items-center justify-between px-4 py-3.5 list-separator active:bg-secondary/50 transition-colors ${
          isSelected ? 'bg-primary/5' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{server.flag}</span>
          <div className="text-left">
            <span className="text-sm font-medium text-foreground">{server.country}</span>
            <span className="text-xs text-muted-foreground ml-2">{server.city}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isSelected && (
            <span className="text-xs text-primary font-medium">Выбран</span>
          )}
          <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
        </div>
      </motion.button>
    );
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
        <h1 className="text-xl font-bold text-foreground">Серверы</h1>
      </div>

      {/* Search */}
      <div className="px-4 sm:px-5 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по странам"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Fast Servers */}
        {fastServers.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-2 px-4 sm:px-5 py-2">
              <Zap className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Быстрые серверы</h2>
            </div>
            <div className="bg-card border-y border-border">
              {fastServers.map((server, i) => (
                <ServerRow key={server.id} server={server} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* All Servers */}
        <div>
          <div className="px-4 sm:px-5 py-2">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Все серверы</h2>
          </div>
          <div className="bg-card border-y border-border">
            {filtered.map((server, i) => (
              <ServerRow key={server.id} server={server} index={i} />
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-12">
            <p className="text-muted-foreground text-sm">Серверы не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServersScreen;
