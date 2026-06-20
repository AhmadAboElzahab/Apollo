import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

export async function createCategory(c: Context<Env>) {
  const { title, type } = await c.req.json();
  const existing = await c.env.DB.prepare('SELECT id FROM categories WHERE title = ? AND type = ?').bind(title, type).first();
  if (existing) return c.json({ error: 'Category with the same title and type already exists.' }, 400);

  const id = crypto.randomUUID();
  await c.env.DB.prepare('INSERT INTO categories (id, title, type) VALUES (?, ?, ?)').bind(id, title, type).run();
  return c.json({ _id: id, title, type });
}

export async function getCategories(c: Context<Env>) {
  const rows = await c.env.DB.prepare('SELECT * FROM categories').all<any>();
  return c.json(rows.results.map((r: any) => ({ _id: r.id, title: r.title, type: r.type })));
}

export async function getCategoriesByType(c: Context<Env>) {
  const type = c.req.param('type');
  const rows = await c.env.DB.prepare('SELECT * FROM categories WHERE type = ?').bind(type).all<any>();
  return c.json(rows.results.map((r: any) => ({ _id: r.id, title: r.title, type: r.type })));
}

export async function updateCategory(c: Context<Env>) {
  const id = c.req.param('id');
  const { title } = await c.req.json();

  const cat = await c.env.DB.prepare('SELECT * FROM categories WHERE id = ?').bind(id).first<any>();
  if (!cat) return c.json({ error: 'Category not found.' }, 404);

  if (title !== cat.title) {
    const dup = await c.env.DB.prepare('SELECT id FROM categories WHERE title = ?').bind(title).first();
    if (dup) return c.json({ error: 'Category with the same title already exists.' }, 400);
  }

  await c.env.DB.prepare('UPDATE categories SET title = ? WHERE id = ?').bind(title, id).run();
  return c.json({ _id: id, title, type: cat.type });
}

export async function deleteCategory(c: Context<Env>) {
  const id = c.req.param('id');

  const [art, aud, lyr] = await Promise.all([
    c.env.DB.prepare('SELECT id FROM artworks WHERE category_id = ? LIMIT 1').bind(id).first(),
    c.env.DB.prepare('SELECT id FROM audio WHERE category_id = ? LIMIT 1').bind(id).first(),
    c.env.DB.prepare('SELECT id FROM lyrics WHERE category_id = ? LIMIT 1').bind(id).first(),
  ]);

  const messages: string[] = [];
  if (art) messages.push("Can't Delete it holds Artworks");
  if (aud) messages.push("Can't Delete it holds Beats");
  if (lyr) messages.push("Can't Delete it holds Lyrics");
  if (messages.length) return c.json({ messages }, 500);

  const deleted = await c.env.DB.prepare('DELETE FROM categories WHERE id = ?').bind(id).run();
  if (!deleted.meta.changes) return c.json({ error: 'Category not found.' }, 404);
  return c.json({ message: 'Category deleted successfully.' });
}

export async function getProductsByCategory(c: Context<Env>) {
  const { type, title } = c.req.param();
  const formattedTitle = title.replace(/-/g, ' ');

  const cat = await c.env.DB.prepare(
    'SELECT * FROM categories WHERE LOWER(type) = LOWER(?) AND LOWER(title) = LOWER(?)',
  ).bind(type, formattedTitle).first<any>();

  if (!cat) return c.json({ message: 'Category not found' }, 404);

  let rows;
  const t = type.toLowerCase();
  if (t === 'artworks') {
    rows = await c.env.DB.prepare('SELECT * FROM artworks WHERE category_id = ?').bind(cat.id).all();
  } else if (t === 'lyrics') {
    rows = await c.env.DB.prepare('SELECT * FROM lyrics WHERE category_id = ?').bind(cat.id).all();
  } else if (t === 'beats') {
    rows = await c.env.DB.prepare('SELECT * FROM audio WHERE category_id = ?').bind(cat.id).all();
  } else {
    return c.json({ error: 'Unknown type' }, 400);
  }

  return c.json(rows.results);
}
