import { Context } from 'hono';
import { Bindings, Variables } from '../types';
import { signToken } from '../middleware/auth';

type Env = { Bindings: Bindings; Variables: Variables };

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256,
  );
  const saltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${saltHex}:${hashHex}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':');
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256,
  );
  const derivedHex = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('');
  return derivedHex === hashHex;
}

function newId(): string {
  return crypto.randomUUID();
}

export async function login(c: Context<Env>) {
  const { email, password } = await c.req.json();
  const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<any>();

  if (!user) return c.json({ message: 'User not found' }, 404);

  const match = await verifyPassword(password, user.password);
  if (!match) return c.json({ message: 'Invalid credentials' }, 401);

  const token = await signToken({ id: user.id, role: user.role }, c.env.SECRET_KEY);

  return new Response(JSON.stringify({ name: user.name, role: user.role, UserId: user.id }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `Apollo-Token=${token}; HttpOnly; Secure; SameSite=None; Path=/`,
    },
  });
}

export async function register(c: Context<Env>) {
  const { email, password, name } = await c.req.json();

  const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existing) return c.json({ message: 'email already in use' }, 409);

  const hashed = await hashPassword(password);
  const id = newId();
  await c.env.DB.prepare('INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)').bind(id, email, hashed, name, 'user').run();

  return c.json({ message: 'User registered successfully' }, 201);
}

export async function logout(c: Context<Env>) {
  return new Response(JSON.stringify({ message: 'Logout successful' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'Apollo-Token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0',
    },
  });
}

export async function changePassword(c: Context<Env>) {
  const userId = c.get('userId');
  const { oldPassword, newPassword } = await c.req.json();

  const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first<any>();
  if (!user) return c.json('User not found', 404);

  const match = await verifyPassword(oldPassword, user.password);
  if (!match) return c.json('Invalid old password', 401);

  const hashed = await hashPassword(newPassword);
  await c.env.DB.prepare('UPDATE users SET password = ? WHERE id = ?').bind(hashed, userId).run();

  return c.json('Password changed successfully', 200);
}
