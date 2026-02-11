import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  message: string;
  senderEmail: string;
  timestamp?: Date;
  hasAttachment?: boolean;
  attachmentName?: string;
}

export const ContactFormEmail = ({
  message = 'This is a test message from the contact form.',
  senderEmail = 'test@example.com',
  timestamp = new Date(),
  hasAttachment = false,
  attachmentName,
}: ContactFormEmailProps) => {
  const formattedDate = timestamp.toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <Html>
      <Head />
      <Preview>New contact form inquiry from {senderEmail}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>GoatLabs</Text>
            <Text style={tagline}>build with internet.</Text>
          </Section>

          <Hr style={divider} />

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>New Inquiry</Heading>

            <Text style={label}>MESSAGE</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>

            {hasAttachment && attachmentName && (
              <>
                <Text style={label}>ATTACHMENT</Text>
                <Text style={attachmentText}>📎 {attachmentName}</Text>
              </>
            )}

            <Hr style={dividerSmall} />

            <Text style={label}>FROM</Text>
            <Text style={metaText}>{senderEmail}</Text>

            <Text style={label}>RECEIVED</Text>
            <Text style={metaText}>{formattedDate}</Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Reply directly to this email to respond to {senderEmail.split('@')[0]}
            </Text>
            <Text style={footerLink}>
              goatlabs.dev
            </Text>
            <Text style={footerLink}>
              contact@goatlabs.dev
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;

// Styles - optimized for email clients
const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#0a0a0a',
  border: '1px solid #1a1a1a',
  borderRadius: '8px',
  margin: '0 auto',
  maxWidth: '600px',
  padding: '40px 32px',
};

const header = {
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const logo = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  letterSpacing: '-0.5px',
  margin: '0 0 4px 0',
  lineHeight: '1',
};

const tagline = {
  color: '#666666',
  fontSize: '11px',
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  margin: '0',
  lineHeight: '1',
};

const divider = {
  borderColor: '#1a1a1a',
  margin: '32px 0',
};

const dividerSmall = {
  borderColor: '#1a1a1a',
  margin: '20px 0',
};

const content = {
  padding: '0',
};

const heading = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  lineHeight: '1.2',
};

const label = {
  color: '#666666',
  fontSize: '10px',
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  letterSpacing: '0.5px',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
};

const messageBox = {
  backgroundColor: '#121212',
  border: '1px solid #1a1a1a',
  borderRadius: '6px',
  padding: '16px',
  marginBottom: '24px',
};

const messageText = {
  color: '#e0e0e0',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
  wordBreak: 'break-word' as const,
};

const attachmentText = {
  color: '#a0a0a0',
  fontSize: '13px',
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  margin: '0 0 24px 0',
};

const metaText = {
  color: '#a0a0a0',
  fontSize: '13px',
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  margin: '0 0 16px 0',
};

const footer = {
  textAlign: 'center' as const,
  paddingTop: '8px',
};

const footerText = {
  color: '#666666',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0 0 16px 0',
};

const footerLink = {
  color: '#808080',
  fontSize: '11px',
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  margin: '4px 0',
  textDecoration: 'none',
};
