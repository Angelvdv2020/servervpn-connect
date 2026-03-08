import { motion } from 'framer-motion';
import { Play, Bot, Globe, Download } from 'lucide-react';

const scenarios = [
  {
    icon: Play,
    title: 'YouTube',
    desc: 'Смотрите видео без ограничений по скорости и географии.',
    color: 'hsl(0, 72%, 55%)',
    bg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    icon: Bot,
    title: 'ChatGPT и AI',
    desc: 'Доступ к ChatGPT, Claude и другим AI-сервисам из любой точки.',
    color: 'hsl(174, 58%, 50%)',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-500',
  },
  {
    icon: Globe,
    title: 'Веб-сёрфинг',
    desc: 'Открывайте любые сайты без блокировок и замедлений.',
    color: 'hsl(199, 89%, 48%)',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-500',
  },
  {
    icon: Download,
    title: 'Торренты',
    desc: 'Безопасно скачивайте файлы через торрент-клиент.',
    color: 'hsl(262, 50%, 62%)',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-500',
  },
];

const ScenariosSection = () => {
  return (
    <section className="py-16 md:py-24 bg-section-accent relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(174 58% 50% / 0.2), transparent 70%)' }} />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
          >
            Для любых задач
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-lg mx-auto"
          >
            Выберите сценарий — приложение само подберёт оптимальный сервер
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-all text-center"
            >
              <div className={`w-16 h-16 rounded-2xl ${s.bg} flex items-center justify-center mx-auto mb-5`}>
                <s.icon className={`w-8 h-8 ${s.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScenariosSection;
