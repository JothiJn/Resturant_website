import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Premium Restaurant',
    short_name: 'PremiumResto',
    description: 'The finest luxury-rustic dining in Coimbatore.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9F5F0',
    theme_color: '#C0392B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
