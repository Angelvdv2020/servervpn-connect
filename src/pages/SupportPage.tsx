import { motion } from 'framer-motion';
import { Mail, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto section-padding">
          <div className="text-center mb-14">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-foreground mb-4"
            >
              Поддержка
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Мы рядом и готовы помочь
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: MessageCircle,
                title: 'Telegram',
                desc: 'Быстрые ответы в чате',
                action: 'Написать',
                href: 'https://t.me/noryxvpn_support',
              },
              {
                icon: Mail,
                title: 'Email',
                desc: 'Для подробных обращений',
                action: 'Написать',
                href: 'mailto:support@noryxvpn.com',
              },
              {
                icon: HelpCircle,
                title: 'Личный кабинет',
                desc: 'Создайте обращение внутри сервиса',
                action: 'Перейти',
                href: 'https://servervpn.store/cabinet/',
              },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center block"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <span className="text-sm font-semibold text-primary">{item.action} →</span>
              </motion.a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Не нашли ответ? Посмотрите{' '}
              <Link to="/#faq" className="text-primary font-medium hover:underline">
                раздел FAQ
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
