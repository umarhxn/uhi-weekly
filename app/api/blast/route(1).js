import { Resend } from 'resend';
import store from '@/lib/store';
import { blastEmail } from '@/lib/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const auth = req.headers.get('x-admin-password');
    if (auth !== process.env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { subject, message } = await req.json();

    if (!subject || !message) {
      return Response.json({ error: 'Subject and message are required.' }, { status: 400 });
    }

    const subs = store.subscribers;
    if (subs.length === 0) {
      return Response.json({ error: 'No subscribers to send to.' }, { status: 400 });
    }

    const tpl = blastEmail(subject, message);

    const batch = subs.map(sub => ({
      from: process.env.RESEND_FROM || 'UHI Weekly <onboarding@resend.dev>',
      to: sub.email,
      subject: tpl.subject,
      html: tpl.html,
    }));

    for (let i = 0; i < batch.length; i += 100) {
      await resend.batch.send(batch.slice(i, i + 100));
    }

    store.emailsSent += subs.length;

    return Response.json({
      success: true,
      sent: subs.length,
      message: `Sent to ${subs.length} subscriber${subs.length > 1 ? 's' : ''}!`,
    });
  } catch (err) {
    console.error('Blast error:', err);
    return Response.json({ error: 'Failed to send blast.' }, { status: 500 });
  }
}
