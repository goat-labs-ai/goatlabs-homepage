export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GoatLabs",
    "url": "https://goatlabs.dev",
    "logo": "https://goatlabs.dev/icon-512.png",
    "description": "Expert web development and digital solutions. Fast, reliable, and professional development services for modern businesses.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Przykładowa 42",
      "addressLocality": "Warszawa",
      "postalCode": "00-001",
      "addressCountry": "PL"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "hello@goatlabs.dev",
      "availableLanguage": ["English", "Polish"]
    },
    "sameAs": [
      "https://linkedin.com",
      "https://github.com",
      "https://twitter.com"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
