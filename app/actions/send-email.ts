'use server';

import { contactFormSchema } from '@/lib/validations';
import { resend } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import { logger } from '@/lib/logger';
import { randomUUID } from 'crypto';
import { render } from '@react-email/render';
import ContactFormEmail from '@/emails/contact-form';

export async function sendContactEmail(formData: FormData) {
  // Generate request ID for tracking
  const requestId = randomUUID();

  try {
    // Extract and validate form data
    const message = formData.get('message') as string;
    const email = formData.get('email') as string;
    const file = formData.get('file') as File | null;
    const website = formData.get('website') as string | null;

    // Log submission attempt (no sensitive data)
    logger.info('Contact form submission received', {
      requestId,
      hasFile: !!(file && file.size > 0),
      messageLength: message?.length || 0,
      emailProvided: !!email,
    });

    // Check honeypot - if filled, it's a bot
    if (website) {
      logger.warn('Honeypot triggered - bot detected', {
        requestId,
        errorType: 'honeypot',
      });
      return {
        success: false,
        error: 'Invalid submission',
      };
    }

    // Rate limiting based on IP
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const rateLimitResult = await rateLimit(ip, { interval: 60000, maxRequests: 3 });

    if (!rateLimitResult.success) {
      const waitSeconds = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);
      logger.warn('Rate limit exceeded', {
        requestId,
        errorType: 'rate_limit',
        ip: ip.substring(0, 12) + '...', // Partial IP for privacy
        waitSeconds,
      });
      return {
        success: false,
        error: `Too many requests. Please try again in ${waitSeconds} seconds.`,
      };
    }

    const result = contactFormSchema.safeParse({
      message,
      email,
      file: file && file.size > 0 ? file : undefined,
      website: website || undefined,
    });

    if (!result.success) {
      logger.warn('Form validation failed', {
        requestId,
        errorType: 'validation',
        validationError: result.error.errors[0].path.join('.'),
      });
      return {
        success: false,
        error: result.error.errors[0].message,
      };
    }

    // Check required environment variables
    const emailFrom = process.env.EMAIL_FROM;
    const emailTo = process.env.EMAIL_TO;

    if (!emailFrom || !emailTo) {
      logger.error('Email configuration missing', {
        requestId,
        errorType: 'config',
        hasEmailFrom: !!emailFrom,
        hasEmailTo: !!emailTo,
      });
      return {
        success: false,
        error: 'Email configuration is missing',
      };
    }

    // Render email template
    const emailHtml = await render(
      ContactFormEmail({
        message,
        senderEmail: email,
        timestamp: new Date(),
        hasAttachment: !!(file && file.size > 0),
        attachmentName: file && file.size > 0 ? file.name : undefined,
      })
    );

    // Plain text fallback
    const emailText = `
New contact form inquiry

MESSAGE:
${message}

${file && file.size > 0 ? `ATTACHMENT: ${file.name} (${(file.size / 1024).toFixed(2)}KB)` : ''}

FROM: ${email}
RECEIVED: ${new Date().toLocaleString()}

---
Reply to this email to respond directly.
goatlabs.dev | contact@goatlabs.dev
    `.trim();

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: 'New inquiry — GoatLabs',
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      logger.error('Email provider error', {
        requestId,
        errorType: 'provider',
        providerError: error.message || 'Unknown provider error',
      });
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      };
    }

    // Success - log without sensitive data
    logger.info('Contact form submission successful', {
      requestId,
      emailId: data?.id,
      hasFile: !!(file && file.size > 0),
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error('Unexpected error during email sending', {
      requestId,
      errorType: 'unexpected',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
