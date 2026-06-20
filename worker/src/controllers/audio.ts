import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

function newId(): string {
  return crypto.randomUUID();
}

export async function createAudio(c: Context<Env>) {
  const formData = await c.req.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const categoryId = formData.get('category') as string;
  const file = formData.get('audio') as File | null;

  if (!file) return c.json({ error: 'No file selected.' }, 400);

  const arrayBuffer = await file.arrayBuffer();
  const ext = file.name.split('.').pop() ?? 'wav';
  const key = `audio/${crypto.randomUUID()}-${title}.${ext}`;

  await c.env.R2.put(key, arrayBuffer, {
    httpMetadata: { contentType: file.type || 'audio/wav' },
  });

  const id = newId();
  await c.env.DB.prepare(
    'INSERT INTO audio (id, title, description, category_id, audio_key, price) VALUES (?, ?, ?, ?, ?, ?)',
  ).bind(id, title, description, categoryId, key, price).run();

  return c.json({ message: 'Audio file uploaded and saved successfully.', id });
}

export async function deleteAudio(c: Context<Env>) {
  const id = c.req.param('id');
  const audio = await c.env.DB.prepare('SELECT * FROM audio WHERE id = ?').bind(id).first<any>();
  if (!audio) return c.json({ error: 'Audio not found.' }, 404);

  await c.env.R2.delete(audio.audio_key);
  await c.env.DB.prepare('DELETE FROM audio WHERE id = ?').bind(id).run();

  return c.json({ message: 'Audio was deleted successfully.' });
}

export async function updateAudio(c: Context<Env>) {
  const id = c.req.param('id');
  const { title, price, description, category } = await c.req.json();

  const audio = await c.env.DB.prepare('SELECT id FROM audio WHERE id = ?').bind(id).first();
  if (!audio) return c.json({ error: 'Audio not found.' }, 404);

  const fields: string[] = [];
  const values: any[] = [];
  if (title) { fields.push('title = ?'); values.push(title); }
  if (price) { fields.push('price = ?'); values.push(price); }
  if (description) { fields.push('description = ?'); values.push(description); }
  if (category) { fields.push('category_id = ?'); values.push(category); }

  if (fields.length) {
    values.push(id);
    await c.env.DB.prepare(`UPDATE audio SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
  }

  const updated = await c.env.DB.prepare('SELECT * FROM audio WHERE id = ?').bind(id).first<any>();
  return c.json({ message: 'Audio updated successfully', audio: updated });
}

export async function getAllAudio(c: Context<Env>) {
  const rows = await c.env.DB.prepare(`
    SELECT a.*, c.title as category_title
    FROM audio a
    LEFT JOIN categories c ON c.id = a.category_id
  `).all<any>();

  const likes = await c.env.DB.prepare('SELECT audio_id, user_id FROM audio_likes').all<any>();
  const likeMap: Record<string, string[]> = {};
  likes.results.forEach((l: any) => {
    if (!likeMap[l.audio_id]) likeMap[l.audio_id] = [];
    likeMap[l.audio_id].push(l.user_id);
  });

  const result = rows.results.map((a: any) => ({
    _id: a.id,
    title: a.title,
    description: a.description,
    category: a.category_title,
    price: a.price,
    Audio: a.audio_key,
    likes: likeMap[a.id] ?? [],
  }));

  return c.json(result);
}

export async function getAudioById(c: Context<Env>) {
  const id = c.req.param('id');
  const audio = await c.env.DB.prepare('SELECT * FROM audio WHERE id = ?').bind(id).first<any>();
  if (!audio) return c.json({ error: 'Audio not found.' }, 404);
  return c.json({ _id: audio.id, title: audio.title, description: audio.description, price: audio.price, Audio: audio.audio_key });
}
