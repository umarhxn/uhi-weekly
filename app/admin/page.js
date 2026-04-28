'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authErr, setAuthErr] = useState('');

  const [stats, setStats] = useState({ posts: 0, subscribers: [], emailsSent: 0 });
  const [cat, setCat] = useState('scholarship');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [link, setLink] = useState('');
  const [postStatus, setPostStatus] = useState(null);
  const [publishing, setPublishing] = useState(false);

  const [blastSubject, setBlastSubject] = useState('');
  const [blastMsg, setBlastMsg] = useState('');
  const [blastStatus, setBlastStatus] = useState(null);
  const [blasting, setBlasting] = useState(false);

  const ADMIN_PW = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'uhi2026';

  function login(e) {
    e.preventDefault();
    if (password === ADMIN_PW) {
      setAuthed(true);
      setAuthErr('');
      localStorage.setItem('uhi_admin_pw', password);
    } else {
      setAuthErr('Wrong password. Try again.');
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('uhi_admin_pw');
    if (saved === ADMIN_PW) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) loadStats();
  }, [authed]);

  async function loadStats() {
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-admin-password': ADMIN_PW },
      });
      const data = await res.json();
      if (data && !data.error) setStats(data);
    } catch (e) {
      console.log('Stats load error', e);
    }
  }

  async function publishPost(e) {
    e.preventDefault();
    setPublishing(true);
    setPostStatus(null);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PW },
        body: JSON.stringify({ cat, title, excerpt, body, link }),
      });
      const data = await res.json();
      if (data.success) {
        setPostStatus({ type: 'success', msg: data.message });
        setTitle(''); setExcerpt(''); setBody(''); setLink('');
        loadStats();
      } else {
        setPostStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setPostStatus({ type: 'error', msg: 'Something went wrong.' });
    }
    setPublishing(false);
  }

  async function sendBlast(e) {
    e.preventDefault();
    setBlasting(true);
    setBlastStatus(null);
    try {
      const res = await fetch('/api/blast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PW },
        body: JSON.stringify({ subject: blastSubject, message: blastMsg }),
      });
      const data = await res.json();
      if (data.success) {
        setBlastStatus({ type: 'success', msg: data.message });
        setBlastSubject(''); setBlastMsg('');
        loadStats();
      } else {
        setBlastStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setBlastStatus({ type: 'error', msg: 'Something went wrong.' });
    }
    setBlasting(false);
  }

  async function removeSub(email) {
    await fetch('/api/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PW },
      body: JSON.stringify({ email }),
    });
    loadStats();
  }

  const previewText = blastSubject || blastMsg
    ? `TO: all subscribers\nFROM: UHI Weekly\nSUBJECT: ${blastSubject || '(no subject)'}\n\n${blastMsg || '(no message)'}\n\n---\nUnsubscribe by replying to this email.`
    : 'Fill in subject and message to preview...';

  if (!authed) return (
    <div className="login-wrap" style={{ background: 'var(--cream)' }}>
      <div className="login-card">
        <div className="login-logo">UHI Weekly</div>
        <div className="login-sub">Admin panel</div>
        <h2>Sign in</h2>
        <p>Enter your admin password to manage posts and subscribers.</p>
        <form onSubmit={login}>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="........"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          {authErr && <div className="alert alert-error">{authErr}</div>}
          <button className="btn-login" type="submit">Enter admin</button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-name">UHI Weekly</span>
          <span className="nav-logo-tagline">Admin panel</span>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">Back to site</a>
          <button
            className="nav-link"
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}
            onClick={() => { localStorage.removeItem('uhi_admin_pw'); setAuthed(false); setPassword(''); }}
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="admin-page">
        <div className="admin-header">
          <h1>Dashboard</h1>
          <p>Publish posts, manage subscribers, send newsletters.</p>
        </div>

        <div className="stats-row">
          <div className="stat-card"><div className="n">{stats.posts}</div><div className="l">Posts</div></div>
          <div className="stat-card"><div className="n">{stats.subscribers?.length || 0}</div><div className="l">Subscribers</div></div>
          <div className="stat-card"><div className="n">{stats.emailsSent || 0}</div><div className="l">Emails sent</div></div>
        </div>

        <div className="admin-grid">
          <div className="panel">
            <h3 className="panel-title">Publish new post</h3>
            <form onSubmit={publishPost}>
              <div className="form-group">
                <label>Category</label>
                <select value={cat} onChange={e => setCat(e.target.value)}>
                  <option value="scholarship">Scholarship</option>
                  <option value="job">Job offer</option>
                  <option value="ai">AI tip</option>
                </select>
              </div>
              <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Fully funded PhD at MIT 2025" required />
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <input value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Brief summary shown in preview" required />
              </div>
              <div className="form-group">
                <label>Full content</label>
                <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Full post content..." required />
              </div>
              <div className="form-group">
                <label>External link (optional)</label>
                <input type="url" value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
              </div>
              <button className="btn-publish" type="submit" disabled={publishing}>
                {publishing ? 'Publishing...' : 'Publish & notify subscribers'}
              </button>
              {postStatus && <div className={`alert alert-${postStatus.type}`} style={{ marginTop: '.75rem' }}>{postStatus.msg}</div>}
            </form>
          </div>

          <div>
            <div className="panel" style={{ marginBottom: '1.25rem' }}>
              <h3 className="panel-title">Subscribers ({stats.subscribers?.length || 0})</h3>
              {!stats.subscribers?.length ? (
                <p style={{ fontSize: '13px', color: 'var(--ink3)' }}>No subscribers yet.</p>
              ) : (
                stats.subscribers.map(s => (
                  <div className="sub-item" key={s.email}>
                    <div>
                      <div className="sub-email-text">{s.email}</div>
                      <div className="sub-date-text">Joined {s.date}</div>
                    </div>
                    <button className="btn-remove" onClick={() => removeSub(s.email)}>Remove</button>
                  </div>
                ))
              )}
            </div>

            <div className="panel">
              <h3 className="panel-title">Send newsletter blast</h3>
              <form onSubmit={sendBlast}>
                <div className="form-group">
                  <label>Subject line</label>
                  <input value={blastSubject} onChange={e => setBlastSubject(e.target.value)} placeholder="UHI Weekly this week's top picks" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea value={blastMsg} onChange={e => setBlastMsg(e.target.value)} style={{ minHeight: '80px' }} placeholder="Write your message..." required />
                </div>
                <div className="form-group">
                  <label>Email preview</label>
                  <div className="email-preview-box">{previewText}</div>
                </div>
                <button className="btn-send" type="submit" disabled={blasting}>
                  {blasting ? 'Sending...' : `Send to ${stats.subscribers?.length || 0} subscribers`}
                </button>
                {blastStatus && <div className={`alert alert-${blastStatus.type}`} style={{ marginTop: '.75rem' }}>{blastStatus.msg}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
