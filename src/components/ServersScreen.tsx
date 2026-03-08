import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Zap } from 'lucide-react';
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
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03 }}
        className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
          isSelected
            ? 'bg-primary/10 border border-primary/30'
            : 'bg-card/60 border border-border/40 hover:bg-secondary'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{server.flag}</span>
          <span className="text-sm font-medium">{server.country}</span>
        </div>
        <button
          onClick={() => handleSelect(server)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            isSelected
              ? 'bg-primary text-primary-foreground'
              : 'border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          {isSelected ? 'Выбран' : 'Connect'}
        </button>
      </motion.div>
    );
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
        <h1 className="text-xl font-bold">Servers</h1>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Countries"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/60 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Fast Servers */}
      {fastServers.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-medium text-muted-foreground">Fast Servers</h2>
          </div>
          <div className="space-y-2">
            {fastServers.map((server, i) => (
              <ServerRow key={server.id} server={server} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* All Servers */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">All Servers</h2>
        <div className="space-y-2">
          {filtered.map((server, i) => (
            <ServerRow key={server.id} server={server} index={i} />
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Серверы не найдены</p>
        </div>
      )}
    </div>
  );
};

export default ServersScreen;
