import { Link } from 'react-router-dom';
import noryxLogo from '@/assets/noryx-logo.png';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto section-padding py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={noryxLogo} alt="NoryxVPN" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-lg text-foreground">NoryxVPN</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Простой и надёжный VPN для повседневных задач. Без сложных настроек — только свободный интернет.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Продукт</h4>
            <ul className="space-y-3">
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Тарифы</Link></li>
              <li><Link to="/download" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Скачать</Link></li>
              <li><Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Возможности</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Поддержка</h4>
            <ul className="space-y-3">
              <li><Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Контакты</Link></li>
              <li><Link to="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Аккаунт</h4>
            <ul className="space-y-3">
              <li><Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Войти</Link></li>
              <li><Link to="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Регистрация</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NoryxVPN. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
