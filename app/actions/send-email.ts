'use server';

import { contactFormSchema } from '@/lib/validations';
import { resend } from '@/lib/email';

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract and validate form data
    const message = formData.get('message') as string;
    const email = formData.get('email') as string;
    const file = formData.get('file') as File | null;

    const result = contactFormSchema.safeParse({
      message,
      email,
      file: file && file.size > 0 ? file : undefined,
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error.errors[0].message,
      };
    }

    // Check required environment variables
    const emailFrom = process.env.EMAIL_FROM;
    const emailTo = process.env.EMAIL_TO;

    if (!emailFrom || !emailTo) {
      return {
        success: false,
        error: 'Email configuration is missing',
      };
    }

    // Prepare email content
    const emailContent = `
New contact form submission:

From: ${email}
Message:
${message}

${file && file.size > 0 ? `Attachment: ${file.name} (${(file.size / 1024).toFixed(2)}KB)` : 'No attachment'}
    `.trim();

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: `New Contact Form Submission from ${email}`,
      text: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
