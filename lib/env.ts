// Environment variables with runtime validation
export const env = {
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@goatlabs.dev',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+48000000000',
  },
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'GoatLabs',
    address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'ul. Przykładowa 42, 00-001 Warszawa, Poland',
    nip: process.env.NEXT_PUBLIC_COMPANY_NIP || '000-000-00-00',
    regon: process.env.NEXT_PUBLIC_COMPANY_REGON || '000000000',
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || 'https://linkedin.com',
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || 'https://github.com',
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || 'https://twitter.com',
  },
} as const;
