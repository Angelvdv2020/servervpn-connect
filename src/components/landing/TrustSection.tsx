import { motion } from 'framer-motion';
import { Shield, Zap, Settings, Smartphone, Headphones, Eye } from 'lucide-react';

const items = [
  { icon: Eye, text: 'Понятный интерфейс без лишних настроек' },
  { icon: Zap, text: 'Подключение за одно нажатие' },
  { icon: Settings, text: 'Автопилот подбирает сервер за вас' },
  { icon: Headphones, text: 'Быстрая поддержка через личный кабинет' },
  { icon: Smartphone, text: 'Приложения для всех платформ' },
  { icon: Shield, text: 'Надёжное шифрование трафика' },
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
            >
              Сервис, которому доверяют
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg mb-8"
            >
              NoryxVPN создан для тех, кому важна простота и надёжность. Без сложных терминов, без перегруза — только удобный VPN.
            </motion.p>
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { num: '10+', label: 'Локаций серверов' },
              { num: '99.9%', label: 'Аптайм сервиса' },
              { num: '<1 мин', label: 'До подключения' },
              { num: '24/7', label: 'Поддержка' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <p className="text-3xl font-extrabold text-gradient mb-2">{stat.num}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
