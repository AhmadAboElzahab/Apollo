import { Context, Next } from 'hono';
import { Bindings, Variables } from '../types';

async function verifyToken(token: string, secret: string): Promise<{ id: string; role: string } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );

    const data = encoder.encode(`${parts[0]}.${parts[1]}`);
    const signature = Uint8Array.from(atob(parts[2].replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, signature, data);
    if (!valid) return null;

    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return { id: payload.id, role: payload.role };
  } catch {
    return null;
  }
}

export async function signToken(payload: { id: string; role: string }, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const body = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const data = encoder.encode(`${header}.${body}`);
  const sig = await crypto.subtle.sign('HMAC', key, data);
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${header}.${body}.${sigB64}`;
}

export function adminAuth(c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) {
  return requireRole('admin')(c, next);
}

export function userAuth(c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) {
  return requireRole('user')(c, next);
}

function requireRole(role: string) {
  return async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const cookie = c.req.header('cookie') ?? '';
    const match = cookie.match(/Apollo-Token=([^;]+)/);
    const token = match?.[1];

    if (!token) return c.json({ message: 'Authorization token missing' }, 401);

    const decoded = await verifyToken(token, c.env.SECRET_KEY);
    if (!decoded) return c.json({ message: 'Invalid token' }, 401);

    if (decoded.role !== role) {
      return c.json({ message: `Access denied. ${role === 'admin' ? 'Admins' : 'Users'} are allowed only.` }, 403);
    }

    c.set('userId', decoded.id);
    c.set('userRole', decoded.role);
    await next();
  };
}

export { verifyToken };
