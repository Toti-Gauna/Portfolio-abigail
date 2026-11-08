import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((l) => ({ url: absoluteUrl(`/${l}/`), changeFrequency: 'monthly', priority: 1 }));
}
