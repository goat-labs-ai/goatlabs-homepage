# Email Templates

Custom transactional email templates using React Email.

## Overview

Contact form submissions are sent using a custom-designed email template that matches the GoatLabs brand:
- Dark, minimal aesthetic
- Monospace accents
- Terminal/build log vibe
- Professional and clean

## Template: Contact Form Email

**File:** [contact-form.tsx](contact-form.tsx)

**Usage:** Automatically rendered and sent when users submit the contact form.

### Email Structure

1. **Header**
   - GoatLabs logo (text)
   - Tagline: "build with internet."

2. **Main Content**
   - "New Inquiry" heading
   - Message (preserves line breaks)
   - Attachment info (if present)
   - Sender email
   - Timestamp

3. **Footer**
   - Reply instructions
   - goatlabs.dev
   - contact@goatlabs.dev

### Email Metadata

- **Subject:** `New inquiry — GoatLabs`
- **From:** `process.env.EMAIL_FROM` (verified domain)
- **To:** `process.env.EMAIL_TO` (founder inbox)
- **Reply-To:** User's email (sender)

### Props

```typescript
interface ContactFormEmailProps {
  message: string;           // User's message
  senderEmail: string;       // User's email
  timestamp?: Date;          // When submitted (default: now)
  hasAttachment?: boolean;   // Whether file attached
  attachmentName?: string;   // File name if attached
}
```

## Local Development

### Preview Email in Browser

Start the React Email preview server:

```bash
npm run email:dev
```

This opens http://localhost:3001 with:
- Live preview of all email templates
- Hot reload on changes
- Multiple email client simulations
- Dark/light mode toggle
- Responsive preview

### Manual Testing

Send a test email:

1. Set up environment variables in `.env.local`:
   ```env
   EMAIL_FROM=onboarding@resend.dev
   EMAIL_TO=your@email.com
   RESEND_API_KEY=re_...
   ```

2. Run dev server:
   ```bash
   npm run dev
   ```

3. Submit contact form at http://localhost:3000/#contact

4. Check your inbox for the styled email

### Test in Multiple Clients

Use [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com) for comprehensive testing.

**Free options:**
- Gmail (web + mobile)
- Outlook.com
- Apple Mail
- Thunderbird

## Styling Guidelines

### What Works in Email

✅ **Safe to use:**
- Inline styles
- Table layouts
- Basic CSS (colors, fonts, padding)
- Web-safe fonts
- Solid colors

❌ **Avoid:**
- External CSS files
- Flexbox/Grid (limited support)
- CSS animations
- Position absolute/fixed
- Background images (limited support)

### Color Palette (from template)

```typescript
Background:    #0a0a0a  // Main dark
Card:          #121212  // Message box
Border:        #1a1a1a  // Dividers
Text Primary:  #ffffff  // Headings
Text Muted:    #e0e0e0  // Body text
Text Dim:      #a0a0a0  // Meta info
Text Subtle:   #808080  // Footer links
Labels:        #666666  // Field labels
```

### Typography

```typescript
Headings:  -apple-system, sans-serif
Body:      -apple-system, sans-serif
Mono:      Menlo, Monaco, "Courier New", monospace
```

## Email Client Compatibility

### Tested & Working

| Client | Status | Notes |
|--------|--------|-------|
| Gmail (Web) | ✅ Excellent | Full support |
| Gmail (Mobile) | ✅ Good | Renders correctly |
| Outlook 365 | ✅ Good | Table-based layout works |
| Apple Mail | ✅ Excellent | Best rendering |
| Thunderbird | ✅ Good | Solid support |
| Outlook 2016+ | ⚠️ Fair | Limited CSS support |

### Known Issues

**Outlook 2016/2019 (Windows):**
- Uses Word rendering engine
- Limited CSS support
- May show slight spacing differences
- **Solution:** Template uses table layouts for compatibility

**Dark Mode:**
- Some clients auto-invert colors
- Template designed for dark backgrounds
- **Solution:** Uses dark colors that work in both modes

## Customization

### Changing Colors

Edit the style objects in [contact-form.tsx](contact-form.tsx):

```typescript
const main = {
  backgroundColor: '#0a0a0a', // Change this
  // ...
};
```

### Adding New Templates

1. Create new file: `emails/your-template.tsx`
2. Import components from `@react-email/components`
3. Export default component
4. Use in server action with `render(YourTemplate(props))`

### Adding Images

**Logo example:**

```typescript
import { Img } from '@react-email/components';

<Img
  src="https://goatlabs.dev/logo.png"
  width="120"
  height="40"
  alt="GoatLabs"
/>
```

**Requirements:**
- Must be hosted on HTTPS
- Use absolute URLs (not relative)
- Specify width/height for layout stability
- Keep file size small (<50KB recommended)

## Production Checklist

Before deploying:

- [ ] Test in Gmail, Outlook, Apple Mail
- [ ] Verify Reply-To works correctly
- [ ] Check subject line is correct
- [ ] Ensure no broken links
- [ ] Test with and without attachment
- [ ] Verify timestamp formatting
- [ ] Check plain text fallback
- [ ] Test on mobile email clients
- [ ] Verify environment variables set
- [ ] Check Resend domain verified

## Troubleshooting

### Email not sending

1. Check environment variables:
   ```bash
   echo $EMAIL_FROM
   echo $EMAIL_TO
   echo $RESEND_API_KEY
   ```

2. Check Resend dashboard for errors
3. Verify domain is verified in Resend
4. Check server logs for error details

### Email looks broken

1. Test in React Email preview: `npm run email:dev`
2. Check if using unsupported CSS
3. Verify all styles are inline
4. Test in multiple email clients
5. Check image URLs are absolute and HTTPS

### Plain text fallback

The template includes a plain text version for:
- Email clients with images disabled
- Accessibility
- Spam filter compatibility

Rendered automatically by `render()` function.

## Resources

- [React Email Documentation](https://react.email/docs/introduction)
- [Email Client CSS Support](https://www.caniemail.com)
- [Resend API Docs](https://resend.com/docs)
- [Email Design Best Practices](https://www.goodemailcode.com)

## Architecture

```
┌─────────────────────────────────────┐
│ User submits form                   │
│ (components/CTASection.tsx)         │
└───────────┬─────────────────────────┘
            │
            v
┌─────────────────────────────────────┐
│ Server Action                       │
│ (app/actions/send-email.ts)         │
│                                     │
│ 1. Validate input                   │
│ 2. Render email template            │
│    (emails/contact-form.tsx)        │
│ 3. Send via Resend                  │
└───────────┬─────────────────────────┘
            │
            v
┌─────────────────────────────────────┐
│ Resend API                          │
│ Sends to: process.env.EMAIL_TO      │
│ Reply-To: User's email              │
└─────────────────────────────────────┘
```

## Future Enhancements

Consider adding:

1. **Multiple template variants**
   - Weekly digest email
   - Welcome email
   - Confirmation email

2. **Dynamic content**
   - Personalized greetings
   - Recent blog posts
   - Social links

3. **Analytics tracking**
   - Open tracking (via Resend)
   - Click tracking
   - Conversion tracking

4. **Internationalization**
   - Support EN/PL email content
   - Locale-based timestamps
