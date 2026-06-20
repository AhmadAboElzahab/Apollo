import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

export async function createLyric(c: Context<Env>) {
  const { title, lyrics, category, price } = await c.req.json();
  const id = crypto.randomUUID();
  await c.env.DB.prepare('INSERT INTO lyrics (id, title, lyrics, category_id, price) VALUES (?, ?, ?, ?, ?)').bind(id, title, lyrics, category, price).run();
  return c.json({ _id: id, title, lyrics, category, price });
}

export async function getAllLyrics(c: Context<Env>) {
  const rows = await c.env.DB.prepare(`
    SELECT l.*, c.title as category_title
    FROM lyrics l
    LEFT JOIN categories c ON c.id = l.category_id
  `).all<any>();

  const likes = await c.env.DB.prepare('SELECT lyrics_id, user_id FROM lyrics_likes').all<any>();
  const likeMap: Record<string, string[]> = {};
  likes.results.forEach((l: any) => {
    if (!likeMap[l.lyrics_id]) likeMap[l.lyrics_id] = [];
    likeMap[l.lyrics_id].push(l.user_id);
  });

  return c.json(rows.results.map((l: any) => ({
    _id: l.id,
    title: l.title,
    lyrics: l.lyrics,
    category: l.category_title,
    price: l.price,
    likes: likeMap[l.id] ?? [],
  })));
}

export async function getLyricById(c: Context<Env>) {
  const id = c.req.param('id');
  const lyric = await c.env.DB.prepare('SELECT * FROM lyrics WHERE id = ?').bind(id).first<any>();
  if (!lyric) return c.json({ error: 'Lyric not found.' }, 404);
  return c.json({ _id: lyric.id, title: lyric.title, lyrics: lyric.lyrics, price: lyric.price, category: lyric.category_id });
}

export async function updateLyricById(c: Context<Env>) {
  const id = c.req.param('id');
  const { title, lyrics, price } = await c.req.json();

  const existing = await c.env.DB.prepare('SELECT id FROM lyrics WHERE id = ?').bind(id).first();
  if (!existing) return c.json({ error: 'Lyric not found.' }, 404);

  const fields: string[] = [];
  const values: any[] = [];
  if (title) { fields.push('title = ?'); values.push(title); }
  if (lyrics) { fields.push('lyrics = ?'); values.push(lyrics); }
  if (price) { fields.push('price = ?'); values.push(price); }

  if (fields.length) {
    values.push(id);
    await c.env.DB.prepare(`UPDATE lyrics SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
  }

  const updated = await c.env.DB.prepare('SELECT * FROM lyrics WHERE id = ?').bind(id).first<any>();
  return c.json({ _id: updated.id, ...updated });
}

export async function deleteLyricById(c: Context<Env>) {
  const id = c.req.param('id');
  const existing = await c.env.DB.prepare('SELECT id FROM lyrics WHERE id = ?').bind(id).first();
  if (!existing) return c.json({ error: 'Lyric not found.' }, 404);
  await c.env.DB.prepare('DELETE FROM lyrics WHERE id = ?').bind(id).run();
  return c.json({ message: 'Lyric deleted successfully.' });
}
