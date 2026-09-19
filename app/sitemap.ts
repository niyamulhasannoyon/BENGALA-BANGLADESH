import { MetadataRoute } from 'next';
import { BANGLADESH_DESTINATIONS } from '@/lib/data/bangladeshDestinations';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bengala-expeditions.com';

  const destinationUrls = BANGLADESH_DESTINATIONS.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...destinationUrls,
  ];
}
