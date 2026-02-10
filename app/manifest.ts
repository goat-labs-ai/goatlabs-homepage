import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GoatLabs - Premium Web Development',
    short_name: 'GoatLabs',
    description: 'Expert web development and digital solutions. Fast, reliable, professional.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0c0f',
    theme_color: '#f5a524',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
