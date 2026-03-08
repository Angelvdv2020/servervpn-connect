import { motion } from 'framer-motion';
import { Monitor, Smartphone, Apple, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';

const platforms = [
  { icon: Monitor, name: 'Windows', desc: 'Windows 10+' },
  { icon: Smartphone, name: 'Android', desc: 'Android 7+' },
  { icon: Apple, name: 'iOS', desc: 'iOS 15+' },
  { icon: Laptop, name: 'Mac', desc: 'macOS 12+' },
];

const PlatformsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-section-alt relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(199 89% 48% / 0.15), transparent 70%)' }} />
      <div className="max-w-7xl mx-auto section-padding text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
        >
          Работает на всех устройствах
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto"
        >
          Скачайте приложение и подключитесь за минуту
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <p.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link
          to="/download"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl vpn-gradient text-primary-foreground font-semibold hover:opacity-90 transition-all"
        >
          Скачать приложение
        </Link>
      </div>
    </section>
  );
};

export default PlatformsSection;
