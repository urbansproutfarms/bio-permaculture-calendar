import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { isRTL, locales, type Locale } from '@/i18n/config';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Load messages for this locale
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={isRTL(locale as Locale) ? 'rtl' : 'ltr'}>
      <body className={inter.className}>
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
