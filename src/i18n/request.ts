import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async () => {
  // Get locale from middleware or use default
  const headersList = await headers();
  const locale = headersList.get('x-locale') || defaultLocale;

  // Validate that the incoming locale is valid
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
