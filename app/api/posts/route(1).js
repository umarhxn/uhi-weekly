import { Resend } from 'resend';
import store from '@/lib/store';
import { newPostEmail } from '@/lib/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  return Response.json({ posts: store.posts });
}

export async function POST(req) {
  try {
    // Admin auth check
    const auth = req.headers.get('x-admin-password');
    if (auth !== process.env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cat, title, excerpt, body, link } = await req.json();

    if (!cat || !title || !excerpt || !body) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const post = {
      id: Date.now().toString(),
      cat,
      title,
      excerpt,
      body,
      link: link || null,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    store.posts.unshift(post);

    // Notify all subscribers
    const subs = store.subscribers;
    if (subs.length > 0) {
      const tpl = newPostEmail(post);

      // Resend supports batch sending (up to 100 per call)
      const batch = subs.map(sub => ({
        from: process.env.RESEND_FROM || 'UHI Weekly <onboarding@resend.dev>',
        to: sub.email,
        subject: tpl.subject,
        html: tpl.html,
      }));

      // Send in chunks of 100
      for (let i = 0; i < batch.length; i += 100) {
        await resend.batch.send(batch.slice(i, i + 100));
      }

      store.emailsSent += subs.length;
    }

    return Response.json({
      success: true,
      post,
      notified: subs.length,
      message: subs.length > 0
        ? `Post published! ${subs.length} subscriber${subs.length > 1 ? 's' : ''} notified.`
        : 'Post published! No subscribers yet.',
    });
  } catch (err) {
    console.error('Publish error:', err);
    return Response.json({ error: 'Failed to publish post.' }, { status: 500 });
  }
}
