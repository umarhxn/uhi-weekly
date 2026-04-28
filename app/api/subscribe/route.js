import { Resend } from 'resend';
import store from '@/lib/store';
import { welcomeEmail } from '@/lib/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    if (store.subscribers.find(s => s.email === email)) {
      return Response.json({ error: 'This email is already subscribed!' }, { status: 409 });
    }

    // Add to store
    store.subscribers.push({
      email,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    });

    // Send welcome email via Resend
    const tpl = welcomeEmail(email);
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'UHI Weekly <onboarding@resend.dev>',
      to: email,
      subject: tpl.subject,
      html: tpl.html,
    });

    store.emailsSent++;

    return Response.json({ success: true, message: "You're subscribed! Check your inbox for a welcome email." });
  } catch (err) {
    console.error('Subscribe error:', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
