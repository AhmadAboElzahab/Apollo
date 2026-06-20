import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

function generateCouponCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function getAllPromoCodes(c: Context<Env>) {
  const rows = await c.env.DB.prepare('SELECT * FROM promo_codes').all<any>();
  return c.json(rows.results.map((r: any) => ({ _id: r.id, code: r.code, value: r.value })));
}

export async function createPromoCode(c: Context<Env>) {
  const { value } = await c.req.json();
  if (value === '' || value === undefined) return c.json({ error: 'value Should not be empty' }, 400);

  const id = crypto.randomUUID();
  const code = generateCouponCode();
  await c.env.DB.prepare('INSERT INTO promo_codes (id, code, value) VALUES (?, ?, ?)').bind(id, code, value).run();
  return c.json({ data: { _id: id, code, value } });
}

export async function deletePromoCode(c: Context<Env>) {
  const id = c.req.param('id');
  const result = await c.env.DB.prepare('DELETE FROM promo_codes WHERE id = ?').bind(id).run();
  if (!result.meta.changes) return c.json({ error: 'Promo not found' }, 404);
  return c.json({ message: 'Promo Code Deleted successfully' });
}

export async function updatePromoCode(c: Context<Env>) {
  const id = c.req.param('id');
  const { value } = await c.req.json();
  if (value === '' || value === undefined) return c.json({ error: 'value Should not be empty' }, 400);

  const result = await c.env.DB.prepare('UPDATE promo_codes SET value = ? WHERE id = ?').bind(value, id).run();
  if (!result.meta.changes) return c.json({ error: 'Promo not found' }, 404);

  const updated = await c.env.DB.prepare('SELECT * FROM promo_codes WHERE id = ?').bind(id).first<any>();
  return c.json({ data: { _id: updated.id, code: updated.code, value: updated.value } });
}

export async function checkPromoCode(c: Context<Env>) {
  const { amount, code } = await c.req.json();
  const promo = await c.env.DB.prepare('SELECT * FROM promo_codes WHERE code = ?').bind(code).first<any>();
  if (!promo) return c.json({ error: 'Promo code not found' }, 404);

  const newAmount = amount - (promo.value * amount) / 100;
  return c.json({ price: newAmount });
}
