import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { kv } from '@/lib/redis';
import { AdminUser, hashPassword, verifyPassword } from '@/lib/auth';

const USERS_KEY = 'admin:users';
const TOKENS_KEY = 'admin:resetTokens';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { action } = body || {};

  if (action === 'login') {
    // TEMPORARILY DISABLE AUTH - ALWAYS ALLOW LOGIN
    console.log('Auth bypassed - allowing all logins');
    return NextResponse.json({ ok: true, bypassed: true });
  }

  if (action === 'forgot') {
    const { email } = body;
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 min
    await kv.hset(TOKENS_KEY, { [token]: JSON.stringify({ email, expiresAt }) });

    const base = process.env.SITE_URL || '';
    const resetUrl = `${base}/admin/reset?token=${token}`;

    // Resend email
    const apiKey = process.env.RESEND_API_KEY || '';
    const from = process.env.EMAIL_FROM || 'no-reply@example.com';
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from,
          to: email,
          subject: 'Reset your Optimal Sports Admin password',
          html: `<p>Click the link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 30 minutes.</p>`,
        }),
      });
    } catch {}
    return NextResponse.json({ ok: true });
  }

  if (action === 'reset') {
    const { token, password } = body;
    const data = await kv.hget<string>(TOKENS_KEY, token);
    if (!data) return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 400 });
    const { email, expiresAt } = JSON.parse(data);
    if (Date.now() > Number(expiresAt)) return NextResponse.json({ ok: false, error: 'Expired token' }, { status: 400 });
    const users: AdminUser[] = (await kv.get<AdminUser[]>(USERS_KEY)) || [];
    let user = users.find(u => u.email.toLowerCase() === String(email || '').toLowerCase());
    const ph = hashPassword(password);
    if (user) {
      user.passwordHash = ph.hash;
      user.salt = ph.salt;
    } else {
      user = { email, passwordHash: ph.hash, salt: ph.salt, role: 'admin' };
      users.push(user);
    }
    await kv.set(USERS_KEY, users);
    await kv.hdel(TOKENS_KEY, token);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
}


