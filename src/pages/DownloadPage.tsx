import { motion } from 'framer-motion';
import { Monitor, Smartphone, Apple, Laptop, Download } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const platforms = [
  { icon: Monitor, name: 'Windows', desc: 'Windows 10 и новее', version: 'v1.2.0', size: '24 MB' },
  { icon: Smartphone, name: 'Android', desc: 'Android 7 и новее', version: 'v1.2.0', size: '18 MB' },
  { icon: Apple, name: 'iOS', desc: 'iOS 15 и новее', version: 'v1.2.0', size: '22 MB' },
  { icon: Laptop, name: 'Mac', desc: 'macOS 12 и новее', version: 'v1.2.0', size: '26 MB' },
];

const DownloadPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto section-padding">
          <div className="text-center mb-14">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-foreground mb-4"
            >
              Скачать NoryxVPN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-lg mx-auto"
            >
              Установите приложение на своё устройство и подключитесь за минуту
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{p.desc}</p>
                    <p className="text-xs text-muted-foreground">{p.version} · {p.size}</p>
                  </div>
                </div>
                <button className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl vpn-gradient text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all">
                  <Download className="w-4 h-4" />
                  Скачать
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage;
