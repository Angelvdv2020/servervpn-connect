import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Алексей',
    text: 'Наконец-то VPN, который просто работает. Подключился за минуту, YouTube летает.',
    rating: 5,
  },
  {
    name: 'Мария',
    text: 'Удобное приложение, понятные тарифы. Автопилот — отличная идея, не нужно ничего настраивать.',
    rating: 5,
  },
  {
    name: 'Дмитрий',
    text: 'Пользуюсь для ChatGPT и работы. Стабильное соединение, поддержка ответила быстро.',
    rating: 5,
  },
  {
    name: 'Екатерина',
    text: 'Перешла с другого VPN — здесь всё проще и понятнее. Очень довольна.',
    rating: 4,
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-section-accent relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(262 50% 62% / 0.15), transparent 70%)' }} />
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
          >
            Что говорят пользователи
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-background border border-border"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                {Array.from({ length: 5 - r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-border" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">{r.text}</p>
              <p className="text-sm font-semibold text-muted-foreground">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
