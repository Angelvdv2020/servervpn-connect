import { motion } from 'framer-motion';
import { Zap, Settings, Wifi, CreditCard, Headphones, Sparkles } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Быстрый старт',
    desc: 'Регистрация за 30 секунд. Скачайте приложение, выберите тариф — и вы в сети.',
  },
  {
    icon: Settings,
    title: 'Сценарии автопилота',
    desc: 'Выберите задачу — YouTube, ChatGPT, веб или торренты — и сервер подберётся автоматически.',
  },
  {
    icon: Wifi,
    title: 'Стабильное подключение',
    desc: 'Серверы в 10+ локациях обеспечивают быстрое и надёжное соединение.',
  },
  {
    icon: CreditCard,
    title: 'Понятные тарифы',
    desc: 'Простая подписка без скрытых платежей. Пополняйте баланс или активируйте купон.',
  },
  {
    icon: Headphones,
    title: 'Поддержка рядом',
    desc: 'Создайте обращение из приложения или личного кабинета — ответим быстро.',
  },
  {
    icon: Sparkles,
    title: 'Чистый интерфейс',
    desc: 'Никаких лишних настроек. Минимум действий — максимум результата.',
  },
];

const WhySection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
          >
            Почему NoryxVPN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            VPN, который не требует разбираться в технологиях
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
