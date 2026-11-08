import '../globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { fontDisplay, fontMono, fontSans } from '../fonts';
import { getDict, isLocale, localeTags, locales } from '@/lib/i18n';
import { NOINDEX, SITE_URL, absoluteUrl, asset } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: '#0d0c0e', width: 'device-width', initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    ...(NOINDEX ? { robots: { index: false, follow: false } } : {}),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: absoluteUrl(`/${locale}/`),
      languages: { ...Object.fromEntries(locales.map((l) => [localeTags[l], absoluteUrl(`/${l}/`)])), 'x-default': absoluteUrl('/es/') },
    },
    openGraph: {
      title: t.title, description: t.description, type: 'website', url: absoluteUrl(`/${locale}/`), siteName: 'Abigail Caricato',
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630, alt: t.ogAlt }],
    },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: [absoluteUrl('/og.png')] },
    icons: { icon: asset('/icon.svg') },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={localeTags[locale]} className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}>
      <head>
        {/* the loader and the hero's entrance only run with JS; without it, everything is visible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
