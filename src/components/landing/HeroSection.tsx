import { motion } from 'framer-motion';
import { Shield, Zap, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const badges = [
  { icon: Shield, text: 'Шифрование данных' },
  { icon: Zap, text: 'Мгновенное подключение' },
  { icon: Globe, text: '10+ локаций' },
];

const HeroSection = () => {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-subtle-grid opacity-40" />
      <div
        className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(199 89% 48% / 0.3), transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(174 58% 50% / 0.3), transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              Быстрый и надёжный VPN
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6"
            >
              Интернет без{' '}
              <span className="text-gradient">границ</span>{' '}
              и ограничений
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            >
              NoryxVPN — простой VPN для повседневных задач. YouTube, ChatGPT, веб-сёрфинг и торренты — всё работает стабильно и быстро.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl vpn-gradient text-primary-foreground font-semibold text-base vpn-glow-sm hover:opacity-90 transition-all"
              >
                Начать бесплатно
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-card border border-border text-foreground font-semibold text-base hover:bg-secondary transition-all"
              >
                Смотреть тарифы
              </Link>
            </motion.div>

            {/* Quick badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {badges.map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <b.icon className="w-4 h-4 text-primary" />
                  {b.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Phone mockup */}
              <div className="relative bg-card rounded-[2.5rem] border-[6px] border-foreground/10 shadow-2xl p-2 overflow-hidden">
                <div className="rounded-[2rem] overflow-hidden bg-background">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 py-3 bg-card">
                    <span className="text-xs font-medium text-muted-foreground">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 rounded-sm bg-foreground/20" />
                      <div className="w-4 h-2 rounded-sm bg-foreground/20" />
                      <div className="w-6 h-3 rounded-sm bg-primary/40" />
                    </div>
                  </div>
                  {/* App content preview */}
                  <div className="px-6 py-8 flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full vpn-gradient flex items-center justify-center mb-6 vpn-glow">
                      <Shield className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <div className="text-center mb-6">
                      <p className="text-2xl font-bold font-mono text-foreground mb-1">00:12:34</p>
                      <p className="text-sm font-medium text-primary">Подключено</p>
                    </div>
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between px-4 py-3 bg-secondary rounded-xl">
                        <span className="text-sm text-foreground">🇩🇪 Frankfurt DE-1</span>
                        <span className="text-xs text-muted-foreground">24ms</span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 bg-secondary rounded-xl">
                        <span className="text-sm text-foreground">⚡ Автопилот · YouTube</span>
                        <span className="text-xs text-primary">Активен</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decorations */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl vpn-gradient flex items-center justify-center shadow-lg"
              >
                <Globe className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -bottom-2 -left-4 w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-lg"
              >
                <Zap className="w-6 h-6 text-accent-foreground" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
