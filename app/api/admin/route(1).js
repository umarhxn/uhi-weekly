import store from '@/lib/store';

export async function GET(req) {
  const auth = req.headers.get('x-admin-password');
  if (auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return Response.json({
    posts: store.posts.length,
    subscribers: store.subscribers,
    emailsSent: store.emailsSent,
  });
}

export async function DELETE(req) {
  const auth = req.headers.get('x-admin-password');
  if (auth !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { email } = await req.json();
  const idx = store.subscribers.findIndex(s => s.email === email);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  store.subscribers.splice(idx, 1);
  return Response.json({ success: true });
}
