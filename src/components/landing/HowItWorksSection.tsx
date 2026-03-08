import { motion } from 'framer-motion';
import { UserPlus, CreditCard, Download, Wifi } from 'lucide-react';

const steps = [
  { icon: UserPlus, num: '01', title: 'Зарегистрируйтесь', desc: 'Создайте аккаунт за 30 секунд — через email или Telegram.' },
  { icon: CreditCard, num: '02', title: 'Выберите тариф', desc: 'Подберите подходящий план или активируйте промо-купон.' },
  { icon: Download, num: '03', title: 'Скачайте приложение', desc: 'Установите NoryxVPN на свой телефон или компьютер.' },
  { icon: Wifi, num: '04', title: 'Подключитесь', desc: 'Нажмите одну кнопку — и вы под защитой.' },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-section-soft relative overflow-hidden">
      <div className="absolute inset-0 bg-subtle-grid opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
          >
            Как начать
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-lg mx-auto"
          >
            От регистрации до защищённого подключения — за 2 минуты
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center"
            >
              <div className="text-5xl font-extrabold text-primary/10 mb-4">{step.num}</div>
              <div className="w-14 h-14 rounded-2xl vpn-gradient flex items-center justify-center mx-auto mb-4 shadow-md">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
