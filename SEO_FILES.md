# SEO Files Documentation

This document explains the robots.txt and sitemap.xml configuration for the site.

## Files

### 1. [app/robots.ts](app/robots.ts)
Generates `/robots.txt` dynamically using Next.js App Router conventions.

**Configuration:**
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',        // All bots
      allow: '/',            // Allow crawling all pages
    },
    sitemap: 'https://goatlabs.dev/sitemap.xml',  // Sitemap location
  };
}
```

**Generated Output:**
```
User-Agent: *
Allow: /

Sitemap: https://goatlabs.dev/sitemap.xml
```

### 2. [app/sitemap.ts](app/sitemap.ts)
Generates `/sitemap.xml` dynamically using Next.js App Router conventions.

**Configuration:**
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://goatlabs.dev',           // Canonical URL
      lastModified: new Date(),               // Current date/time
      changeFrequency: 'monthly',             // How often page changes
      priority: 1,                            // Highest priority (0-1)
    },
  ];
}
```

**Generated Output:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://goatlabs.dev</loc>
    <lastmod>2026-02-11T08:09:42.424Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
  </url>
</urlset>
```

## Key Decisions

### No Language Alternates
The sitemap does NOT include separate URLs for Polish language because:
- Language switching is client-side only (via `LanguageContext`)
- There are no separate `/pl` routes
- Adding non-existent alternates would confuse search engines

**Previous (Incorrect):**
```typescript
// ❌ DON'T DO THIS - these URLs don't exist
alternates: {
  languages: {
    en: 'https://goatlabs.dev?lang=en',
    pl: 'https://goatlabs.dev?lang=pl',
  },
}
```

**Current (Correct):**
```typescript
// ✅ Single canonical URL
{
  url: 'https://goatlabs.dev',
  lastModified: new Date(),
}
```

### Single Page Site
Currently only the homepage is indexed because:
- It's a single-page application
- All content is on one page with anchor navigation (#contact, #about, etc.)
- No blog, no additional pages

**If you add more pages**, update `sitemap.ts`:
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://goatlabs.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://goatlabs.dev/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://goatlabs.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
```

## Testing

### Test robots.txt

```bash
# Dev server
npm run dev
curl http://localhost:3000/robots.txt

# Production
curl https://goatlabs.dev/robots.txt
```

**Expected output:**
```
User-Agent: *
Allow: /

Sitemap: https://goatlabs.dev/sitemap.xml
```

### Test sitemap.xml

```bash
# Dev server
npm run dev
curl http://localhost:3000/sitemap.xml

# Production
curl https://goatlabs.dev/sitemap.xml
```

**Expected output:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://goatlabs.dev</loc>
<lastmod>2026-02-11T08:09:42.424Z</lastmod>
<changefreq>monthly</changefreq>
<priority>1</priority>
</url>
</urlset>
```

### Validate Sitemap

Use Google's Sitemap validator:
1. Go to [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
2. Enter: `https://goatlabs.dev/sitemap.xml`
3. Click "Validate Sitemap"
4. Should show: ✅ Valid XML Sitemap

Or use Google Search Console:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Go to Sitemaps → Add new sitemap
4. Enter: `sitemap.xml`
5. Submit

## SEO Checklist

- [x] robots.txt allows all crawlers
- [x] robots.txt references sitemap
- [x] Sitemap uses canonical URL (https://goatlabs.dev)
- [x] Sitemap includes lastModified
- [x] No incorrect language alternates
- [x] Priority set to 1 for homepage
- [x] Change frequency set to 'monthly'
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor indexing status after deployment

## Canonical URL

The site uses **https://goatlabs.dev** as the canonical URL everywhere:
- Metadata: `canonical: 'https://goatlabs.dev'`
- Sitemap: `url: 'https://goatlabs.dev'`
- Robots: `sitemap: 'https://goatlabs.dev/sitemap.xml'`

**Important:** Ensure all these match in production. No:
- Trailing slashes (`https://goatlabs.dev/`)
- www prefix (`https://www.goatlabs.dev`)
- Query parameters (`https://goatlabs.dev?lang=en`)
- Mixed protocols (all HTTPS, never HTTP)

## Dynamic Sitemap Updates

Currently, `lastModified` is set to `new Date()`, which means:
- Sitemap timestamp updates on every request
- Search engines see a fresh timestamp
- Good for frequently updated content

**For static sites**, consider hardcoding:
```typescript
lastModified: '2026-02-11',  // Last actual content change
```

**For dynamic content**, fetch from database:
```typescript
export default async function sitemap(): MetadataRoute.Sitemap {
  const posts = await fetchBlogPosts();

  return [
    {
      url: 'https://goatlabs.dev',
      lastModified: new Date(),
    },
    ...posts.map(post => ({
      url: `https://goatlabs.dev/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ];
}
```

## robots.txt Advanced Rules

Current configuration allows all bots. To block specific bots:

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',      // OpenAI's crawler
        disallow: '/',             // Block AI training
      },
      {
        userAgent: 'CCBot',        // Common Crawl
        disallow: '/',
      },
    ],
    sitemap: 'https://goatlabs.dev/sitemap.xml',
  };
}
```

To block specific paths:

```typescript
rules: {
  userAgent: '*',
  allow: '/',
  disallow: ['/admin', '/api', '/private'],
}
```

## Troubleshooting

### Sitemap not showing in search results
- Wait 24-48 hours after deployment
- Submit manually to Google Search Console
- Check for errors in Search Console
- Verify sitemap is accessible (no 404)

### robots.txt not being respected
- Ensure file is at `/robots.txt` (not `/app/robots.txt`)
- Check server is returning correct content-type: `text/plain`
- Test with [Google's robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)
- Some bots ignore robots.txt (especially malicious ones)

### lastModified not updating
- If using `new Date()`, timestamp updates on every build
- For static sites, hardcode the date
- For ISR, set revalidation time

## References

- [Next.js robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Robots.txt Specification](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
