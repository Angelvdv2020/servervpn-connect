import { motion } from 'framer-motion';
import { Shield, Zap, Globe } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import noryxLogo from '@/assets/noryx-logo.png';

const features = [
  { icon: Shield, title: 'Безопасность', desc: 'Защита данных по протоколу VLESS' },
  { icon: Zap, title: 'Автопилот', desc: 'Умный выбор сервера и маршрута' },
  { icon: Globe, title: 'Серверы по всему миру', desc: '10+ локаций для стабильного соединения' },
];

const OnboardingScreen = () => {
  const { setOnboardingComplete, setCurrentScreen } = useAppStore();

  const handleStart = () => {
    setOnboardingComplete();
    setCurrentScreen('home');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between px-6 py-12">
      {/* Logo area */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center pt-8"
      >
        <img src={noryxLogo} alt="NORYX" className="w-56 object-contain mb-4" />
        <p className="text-muted-foreground mt-2 text-sm">Безопасный доступ в интернет</p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-sm space-y-4"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card glass-border"
          >
            <div className="w-10 h-10 rounded-lg vpn-gradient flex items-center justify-center shrink-0">
              <f.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">{f.title}</p>
              <p className="text-muted-foreground text-xs">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="w-full max-w-sm pb-4"
      >
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-2xl vpn-gradient text-primary-foreground font-semibold text-lg vpn-glow-sm transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Начать
        </button>
      </motion.div>
    </div>
  );
};

export default OnboardingScreen;
