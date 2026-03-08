import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Как начать пользоваться NoryxVPN?',
    a: 'Зарегистрируйтесь на сайте, выберите тариф или активируйте купон, скачайте приложение и подключитесь одним нажатием.',
  },
  {
    q: 'Как выбрать подходящий тариф?',
    a: 'Для знакомства подойдёт базовый план. Для ежедневного использования рекомендуем «Оптимальный» — он покрывает большинство задач.',
  },
  {
    q: 'Как активировать купон?',
    a: 'После регистрации перейдите в раздел оплаты в личном кабинете и введите промо-код. Скидка применится автоматически.',
  },
  {
    q: 'Как подключиться к VPN?',
    a: 'Откройте приложение NoryxVPN, выберите сценарий или сервер и нажмите кнопку подключения. Автопилот подберёт лучший маршрут.',
  },
  {
    q: 'Какие сценарии доступны?',
    a: 'Сейчас доступны: обычный веб-сёрфинг, YouTube, ChatGPT и AI-сервисы, торренты. Каждый сценарий оптимизирован под свою задачу.',
  },
  {
    q: 'Где скачать приложение?',
    a: 'Приложение доступно для Windows, Android, iOS и Mac. Перейдите на страницу «Скачать» и выберите свою платформу.',
  },
  {
    q: 'Как обратиться в поддержку?',
    a: 'Создайте обращение через личный кабинет или напишите нам в Telegram. Мы отвечаем быстро.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto section-padding">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
          >
            Частые вопросы
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-2xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
