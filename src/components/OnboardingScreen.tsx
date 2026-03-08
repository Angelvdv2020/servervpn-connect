import { motion } from 'framer-motion';
import { Shield, Zap, Globe } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const features = [
  { icon: Shield, title: 'Безопасность', desc: 'Защита данных по протоколу VLESS' },
  { icon: Zap, title: 'Автопилот', desc: 'Умный выбор сервера и маршрута' },
  { icon: Globe, title: 'Серверы по всему миру', desc: '10+ локаций для стабильного соединения' },
];

const AnimatedShield = () => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    {/* Orbiting dots */}
    <motion.div
      className="absolute w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <motion.div
          key={deg}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${deg}deg) translateY(-88px) translateX(-4px)`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: deg / 360 * 2 }}
        />
      ))}
    </motion.div>

    {/* Outer ring */}
    <motion.div
      className="absolute w-44 h-44 rounded-full border-2 border-primary/20"
      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Middle ring */}
    <motion.div
      className="absolute w-36 h-36 rounded-full border border-primary/15"
      animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    />

    {/* Shield glow */}
    <motion.div
      className="absolute w-28 h-28 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(46,211,154,0.15), transparent 70%)' }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Shield SVG */}
    <motion.svg
      width="80"
      height="92"
      viewBox="0 0 80 92"
      fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
    >
      {/* Shield shape */}
      <motion.path
        d="M40 4L8 20V44C8 64.5 21.5 83.5 40 88C58.5 83.5 72 64.5 72 44V20L40 4Z"
        fill="url(#shieldGradient)"
        stroke="hsl(160, 65%, 48%)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      {/* Checkmark */}
      <motion.path
        d="M28 46L36 54L52 38"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
      />
      <defs>
        <linearGradient id="shieldGradient" x1="40" y1="4" x2="40" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2ED39A" />
          <stop offset="100%" stopColor="#19A979" />
        </linearGradient>
      </defs>
    </motion.svg>
  </div>
);

const OnboardingScreen = () => {
  const { setOnboardingComplete, setCurrentScreen } = useAppStore();

  const handleStart = () => {
    setOnboardingComplete();
    setCurrentScreen('home');
  };

  return (
    <div className="flex flex-col h-screen h-[100dvh] items-center justify-between px-5 sm:px-6 py-10 sm:py-12 bg-background overflow-hidden">
      {/* Animated shield */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center pt-6 flex-1 justify-center"
      >
        <AnimatedShield />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-2xl font-bold text-foreground mt-6"
        >
          NORYX VPN
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-muted-foreground mt-2 text-sm"
        >
          Безопасный доступ в интернет
        </motion.p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-sm space-y-3"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
          >
            <div className="w-10 h-10 rounded-lg vpn-gradient flex items-center justify-center shrink-0">
              <f.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">{f.title}</p>
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
        className="w-full max-w-sm pt-6 pb-2"
      >
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-2xl vpn-gradient text-white font-semibold text-lg vpn-glow-sm transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Начать
        </button>
      </motion.div>
    </div>
  );
};

export default OnboardingScreen;
