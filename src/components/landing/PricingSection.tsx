import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Базовый',
    price: '149 ₽',
    period: '/ мес',
    desc: 'Для знакомства с сервисом',
    features: ['1 устройство', 'Все серверы', 'Автопилот сценариев', 'Поддержка'],
    popular: false,
  },
  {
    name: 'Оптимальный',
    price: '299 ₽',
    period: '/ мес',
    desc: 'Лучший выбор для ежедневного использования',
    features: ['3 устройства', 'Все серверы', 'Приоритетные серверы', 'Автопилот сценариев', 'Приоритетная поддержка'],
    popular: true,
  },
  {
    name: 'Годовой',
    price: '1 990 ₽',
    period: '/ год',
    desc: 'Экономия более 40%',
    features: ['5 устройств', 'Все серверы', 'Приоритетные серверы', 'Автопилот сценариев', 'Приоритетная поддержка', 'Заморозка подписки'],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-section-alt relative overflow-hidden">
      <div className="absolute top-10 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(199 89% 48% / 0.12), transparent 70%)' }} />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
          >
            Простые и понятные тарифы
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-lg mx-auto"
          >
            Без скрытых платежей. Выберите план и начните пользоваться
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 md:p-8 rounded-2xl border transition-all ${
                plan.popular
                  ? 'bg-background border-primary shadow-xl scale-[1.02]'
                  : 'bg-background border-border hover:border-primary/30 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full vpn-gradient text-primary-foreground text-xs font-semibold">
                  Популярный
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? 'vpn-gradient text-primary-foreground vpn-glow-sm hover:opacity-90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Выбрать
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Есть промо-купон? Активируйте его после регистрации
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
