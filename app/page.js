'use client';
import { useState, useEffect } from 'react';

const CAT_LABELS = { scholarship: 'Scholarship', job: 'Job offer', ai: 'AI tip' };
const CAT_CLASSES = { scholarship: 'tag-scholarship', job: 'tag-job', ai: 'tag-ai' };

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetch('/api/posts').then(r => r.json()).then(d => setPosts(d.posts || []));
  }, []);

  const filtered = filter === 'all' ? posts : posts.filter(p => p.cat === filter);

  async function subscribe(e) {
    e.preventDefault();
    setLoading(true);
    setSubStatus(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubStatus({ type: 'success', msg: data.message });
        setEmail('');
      } else {
        setSubStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setSubStatus({ type: 'error', msg: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-name">UHI Weekly</span>
          <span className="nav-logo-tagline">Your edge. Weekly.</span>
        </div>
        <div className="nav-links">
          <a href="/admin" className="nav-link admin-btn">Admin ↗</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-eyebrow">✦ Free newsletter</div>
          <h1>Stay ahead.<br /><span>Every week.</span></h1>
          <p className="hero-sub">
            Scholarships, job opportunities & AI tips — curated and delivered straight to your inbox.
          </p>
          <form className="subscribe-form" onSubmit={subscribe}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button className="btn-gold" type="submit" disabled={loading}>
              {loading ? 'Subscribing…' : 'Subscribe free →'}
            </button>
          </form>
          {subStatus && (
            <div className={`alert alert-${subStatus.type}`}>{subStatus.msg}</div>
          )}
          <p className="hero-note">Free forever. No spam. Unsubscribe anytime.</p>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">{posts.length}</div><div className="lbl">Posts</div></div>
            <div className="hero-stat"><div className="num">3</div><div className="lbl">Categories</div></div>
            <div className="hero-stat"><div className="num">Weekly</div><div className="lbl">Cadence</div></div>
          </div>
        </div>
      </section>

      {/* POSTS */}
      <section className="posts-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest posts</h2>
            <div className="filter-tabs">
              {['all', 'scholarship', 'job', 'ai'].map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${filter === cat ? `active-${cat}` : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat === 'all' ? 'All' : CAT_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">No posts in this category yet.</div>
          ) : (
            <div className="posts-grid">
              {filtered.map(post => (
                <div className="post-card" key={post.id} onClick={() => setModal(post)}>
                  <span className={`post-tag ${CAT_CLASSES[post.cat]}`}>{CAT_LABELS[post.cat]}</span>
                  <div className="post-title">{post.title}</div>
                  <div className="post-excerpt">{post.excerpt}</div>
                  <div className="post-footer">
                    <span className="post-date">{post.date}</span>
                    <button className="read-btn" onClick={e => { e.stopPropagation(); setModal(post); }}>
                      Read more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p><strong>UHI Weekly</strong> — Your edge, every week. © {new Date().getFullYear()}</p>
      </footer>

      {/* MODAL */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <span className={`post-tag ${CAT_CLASSES[modal.cat]}`}>{CAT_LABELS[modal.cat]}</span>
            <h2 className="modal-title">{modal.title}</h2>
            <div className="modal-meta">Published {modal.date}</div>
            <div className="modal-body">{modal.body}</div>
            {modal.link && (
              <a className="modal-cta" href={modal.link} target="_blank" rel="noreferrer">
                View full opportunity →
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
