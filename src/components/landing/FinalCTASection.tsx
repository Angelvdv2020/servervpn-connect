import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-section-alt relative overflow-hidden">
      <div className="absolute inset-0 bg-subtle-grid opacity-15 pointer-events-none" />
      <div className="max-w-4xl mx-auto section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(199, 89%, 48%), hsl(174, 58%, 50%))',
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              Начните пользоваться NoryxVPN прямо сейчас
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
              Регистрация за 30 секунд. Подключение — за одно нажатие. Никаких сложных настроек.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary-foreground text-foreground font-semibold text-base hover:bg-primary-foreground/90 transition-all shadow-lg"
              >
                Создать аккаунт
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition-all"
              >
                Посмотреть тарифы
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
