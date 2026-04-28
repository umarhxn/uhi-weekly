// lib/emails.js — Beautiful HTML email templates

const CAT_COLORS = {
  scholarship: { bg: '#e8f4f1', text: '#2d7d6e', label: 'Scholarship' },
  job: { bg: '#fef3e2', text: '#a0640a', label: 'Job Offer' },
  ai: { bg: '#f0eeff', text: '#5540cc', label: 'AI Tip' },
};

export function welcomeEmail(email) {
  return {
    subject: 'Welcome to UHI Weekly 🎉',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f4ef;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4ef;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:#1a1a2e;border-radius:16px 16px 0 0;padding:40px;text-align:center;">
          <h1 style="margin:0;color:#f0d080;font-family:Georgia,serif;font-size:28px;font-weight:700;">UHI Weekly</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.45);font-size:11px;letter-spacing:3px;text-transform:uppercase;">Your Edge. Weekly.</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
          <h2 style="font-family:Georgia,serif;color:#1a1a2e;font-size:22px;margin:0 0 16px;">You're in! Welcome aboard 🙌</h2>
          <p style="color:#4a4a6a;font-size:15px;line-height:1.7;margin:0 0 16px;">
            Hey there — you've just joined a community of ambitious people who never miss an opportunity.
          </p>
          <p style="color:#4a4a6a;font-size:15px;line-height:1.7;margin:0 0 24px;">
            Every week, <strong style="color:#1a1a2e;">UHI Weekly</strong> delivers:
          </p>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="padding:8px 0;">
              <span style="background:#e8f4f1;color:#2d7d6e;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;">SCHOLARSHIPS</span>
              <span style="color:#4a4a6a;font-size:14px;margin-left:10px;">Fully funded opportunities worldwide</span>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <span style="background:#fef3e2;color:#a0640a;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;">JOB OFFERS</span>
              <span style="color:#4a4a6a;font-size:14px;margin-left:10px;">Remote &amp; on-site roles across sectors</span>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <span style="background:#f0eeff;color:#5540cc;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;">AI TIPS</span>
              <span style="color:#4a4a6a;font-size:14px;margin-left:10px;">Practical prompts &amp; tools to work smarter</span>
            </td></tr>
          </table>
          <p style="color:#8888aa;font-size:13px;line-height:1.6;border-top:1px solid #eee;padding-top:20px;margin:0;">
            You subscribed with ${email}. To unsubscribe, reply to this email with "unsubscribe" in the subject.
          </p>
        </td></tr>
        <tr><td style="text-align:center;padding:20px;">
          <p style="color:#8888aa;font-size:12px;margin:0;">© ${new Date().getFullYear()} UHI Weekly. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

export function newPostEmail(post, subscribers) {
  const cat = CAT_COLORS[post.cat] || CAT_COLORS.ai;
  return {
    subject: `[UHI Weekly] ${post.title}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f4ef;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4ef;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#1a1a2e;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;color:#f0d080;font-family:Georgia,serif;font-size:24px;">UHI Weekly</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.4);font-size:10px;letter-spacing:3px;text-transform:uppercase;">New post just dropped</p>
        </td></tr>
        <tr><td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
          <span style="background:${cat.bg};color:${cat.text};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">${cat.label}</span>
          <h2 style="font-family:Georgia,serif;color:#1a1a2e;font-size:22px;margin:16px 0 12px;line-height:1.3;">${post.title}</h2>
          <p style="color:#4a4a6a;font-size:15px;line-height:1.7;margin:0 0 24px;">${post.excerpt}</p>
          <div style="background:#faf9f4;border-radius:10px;padding:20px;margin-bottom:24px;">
            <p style="color:#4a4a6a;font-size:14px;line-height:1.8;margin:0;white-space:pre-wrap;">${post.body}</p>
          </div>
          ${post.link ? `<a href="${post.link}" style="display:inline-block;background:#1a1a2e;color:#fff;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:500;text-decoration:none;">View full opportunity →</a>` : ''}
          <p style="color:#8888aa;font-size:12px;line-height:1.6;border-top:1px solid #eee;padding-top:20px;margin:24px 0 0;">
            You received this because you subscribed to UHI Weekly. Reply with "unsubscribe" to opt out.
          </p>
        </td></tr>
        <tr><td style="text-align:center;padding:20px;">
          <p style="color:#8888aa;font-size:12px;margin:0;">© ${new Date().getFullYear()} UHI Weekly</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

export function blastEmail(subject, message) {
  return {
    subject,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f4ef;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4ef;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#1a1a2e;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;color:#f0d080;font-family:Georgia,serif;font-size:24px;">UHI Weekly</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.4);font-size:10px;letter-spacing:3px;text-transform:uppercase;">Newsletter</p>
        </td></tr>
        <tr><td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
          <p style="color:#4a4a6a;font-size:15px;line-height:1.85;margin:0 0 24px;white-space:pre-wrap;">${message}</p>
          <p style="color:#8888aa;font-size:12px;line-height:1.6;border-top:1px solid #eee;padding-top:20px;margin:0;">
            You received this because you subscribed to UHI Weekly. Reply with "unsubscribe" to opt out.
          </p>
        </td></tr>
        <tr><td style="text-align:center;padding:20px;">
          <p style="color:#8888aa;font-size:12px;margin:0;">© ${new Date().getFullYear()} UHI Weekly</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}
