# GoatLabs Homepage

A Next.js App Router project with TypeScript, Tailwind CSS, and shadcn/ui components.

## Getting Started

### Prerequisites

- Node.js 18+ installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your environment variables in .env.local
# See "Environment Variables" section below

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Environment Variables

Before deploying or running in production, configure the following environment variables in `.env.local`:

### Required Configuration

```env
# Email Service (Resend) - Required for contact form
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your@email.com

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_CONTACT_PHONE=+48123456789

# Company Details
NEXT_PUBLIC_COMPANY_NAME=Your Company Name
NEXT_PUBLIC_COMPANY_ADDRESS=Your Address
NEXT_PUBLIC_COMPANY_NIP=123-456-78-90
NEXT_PUBLIC_COMPANY_REGON=123456789

# Social Media URLs
NEXT_PUBLIC_SOCIAL_LINKEDIN=https://linkedin.com/in/yourprofile
NEXT_PUBLIC_SOCIAL_GITHUB=https://github.com/yourprofile
NEXT_PUBLIC_SOCIAL_TWITTER=https://twitter.com/yourprofile
```

#### Email Configuration

The contact form uses [Resend](https://resend.com) for email delivery:

1. Sign up for a free account at [resend.com](https://resend.com)
2. Verify your domain or use their test domain
3. Generate an API key from the dashboard
4. Set `RESEND_API_KEY` in your environment
5. Configure `EMAIL_FROM` (must be a verified domain)
6. Set `EMAIL_TO` (where form submissions go)

⚠️ **Important**: Never commit `.env.local` to version control. Use `.env.example` as a template.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   ├── providers.tsx    # Client-side providers
│   └── not-found.tsx    # 404 page
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization (EN/PL)
├── lib/                # Utility functions and config
│   ├── env.ts         # Environment variables
│   └── validations.ts # Zod schemas
└── assets/             # Static assets (images, fonts)
```

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Framer Motion** - Animation library
- **Zod** - Schema validation
- **TanStack Query** - Data fetching

## Available Scripts

```sh
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Deployment

This Next.js application can be deployed to:

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Supports Next.js with edge functions
- **Docker** - Use the standalone output mode (already configured)

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy

### Environment Variables in Production

Make sure to set all required environment variables in your hosting platform's dashboard before deploying.
