import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

async function sendEmail(env: Bindings, to: string, userName: string, products: any[], paymentId: string) {
  const productsRows = products
    .map((p) => `<tr><td>${p.name}</td><td>${p.type}</td></tr>`)
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color:black; color:white;">
      <h1 style="font-size:60px;">Apollo</h1>
      <h2>Thanks ${userName} For Purchasing From Apollo music Assets</h2>
      <h2>You have the complete License to use these assets</h2>
      <h2>License Number: ${paymentId}</h2>
      <table style="width:100%; color:white;">
        <thead><tr><th>Name</th><th>Type</th></tr></thead>
        <tbody>${productsRows}</tbody>
      </table>
    </div>`;

  // Send via Mailchannels (free on Cloudflare Workers, no API key needed)
  await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: env.EMAIL, name: 'Apollo' },
      subject: 'License',
      content: [{ type: 'text/html', value: html }],
    }),
  });
}

export async function addPayment(c: Context<Env>) {
  const userId = c.get('userId');
  const { products, totalPrice } = await c.req.json();

  const paymentId = crypto.randomUUID();
  const id = crypto.randomUUID();

  await c.env.DB.prepare(
    'INSERT INTO payments (id, payment_id, buyer_id, total_price) VALUES (?, ?, ?, ?)',
  ).bind(id, paymentId, userId, totalPrice).run();

  const stmts = products.map((p: any) =>
    c.env.DB.prepare(
      'INSERT INTO payment_products (id, payment_id, product_id, name, price, type) VALUES (?, ?, ?, ?, ?, ?)',
    ).bind(crypto.randomUUID(), id, p.id, p.name, p.price, p.type),
  );
  await c.env.DB.batch(stmts);

  const user = await c.env.DB.prepare('SELECT email, name FROM users WHERE id = ?').bind(userId).first<any>();
  if (user) {
    await sendEmail(c.env, user.email, user.name, products, paymentId);
  }

  return c.json({ _id: id, paymentID: paymentId, BuyerID: userId, products, totalPrice });
}

export async function getPurchaseHistory(c: Context<Env>) {
  const userId = c.get('userId');
  const payments = await c.env.DB.prepare('SELECT * FROM payments WHERE buyer_id = ?').bind(userId).all<any>();

  const result = await Promise.all(
    payments.results.map(async (p: any) => {
      const products = await c.env.DB.prepare('SELECT * FROM payment_products WHERE payment_id = ?').bind(p.id).all<any>();
      return { _id: p.id, paymentID: p.payment_id, BuyerID: p.buyer_id, totalPrice: p.total_price, createdAt: p.created_at, products: products.results };
    }),
  );

  return c.json(result);
}

export async function getPayments(c: Context<Env>) {
  const payments = await c.env.DB.prepare('SELECT * FROM payments ORDER BY created_at ASC').all<any>();

  const data: Record<number, { name: number; total: number; months: { name: string; total: number }[] }> = {};

  payments.results.forEach((p: any) => {
    const date = new Date(p.created_at);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });

    if (!data[year]) data[year] = { name: year, total: 0, months: [] };

    let monthEntry = data[year].months.find((m) => m.name === month);
    if (!monthEntry) {
      monthEntry = { name: month, total: 0 };
      data[year].months.push(monthEntry);
    }

    monthEntry.total += p.total_price;
    data[year].total += p.total_price;
  });

  return c.json(Object.values(data).map((y) => ({ year: y.name, total: y.total, months: y.months })));
}
