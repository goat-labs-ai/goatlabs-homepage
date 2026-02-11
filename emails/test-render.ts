import { render } from '@react-email/render';
import ContactFormEmail from './contact-form';

async function testRender() {
  const html = await render(
    ContactFormEmail({
      message: 'This is a test message.\n\nWith multiple lines.\n\nAnd some more content to see how it looks.',
      senderEmail: 'test@example.com',
      timestamp: new Date(),
      hasAttachment: true,
      attachmentName: 'proposal.pdf',
    })
  );

  console.log('Email HTML generated successfully!');
  console.log('Length:', html.length, 'characters');
  console.log('\nPreview (first 500 chars):');
  console.log(html.substring(0, 500));
}

testRender().catch(console.error);
