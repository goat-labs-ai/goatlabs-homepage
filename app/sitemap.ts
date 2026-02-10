import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://goatlabs.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://goatlabs.dev?lang=en',
          pl: 'https://goatlabs.dev?lang=pl',
        },
      },
    },
  ];
}
