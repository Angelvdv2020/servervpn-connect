import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import noryxLogo from '@/assets/noryx-logo.png';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center section-padding py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <img src={noryxLogo} alt="NoryxVPN" className="w-10 h-10 rounded-xl" />
            <span className="font-bold text-xl text-foreground">NoryxVPN</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-foreground mb-2">Вход в аккаунт</h1>
          <p className="text-muted-foreground text-sm">Войдите, чтобы управлять подпиской</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl vpn-gradient text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
            >
              Войти
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">или</span></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-[hsl(200,80%,50%)] text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
            Войти через Telegram
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Зарегистрироваться
          </Link>
        </p>

        <p className="text-center mt-3">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← На главную
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
