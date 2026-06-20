import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

export async function likePost(c: Context<Env>) {
  const userId = c.get('userId');
  const { postId, type } = await c.req.json();

  const tableMap: Record<string, { table: string; col: string }> = {
    Artwork: { table: 'artwork_likes', col: 'artwork_id' },
    Audio: { table: 'audio_likes', col: 'audio_id' },
    Lyrics: { table: 'lyrics_likes', col: 'lyrics_id' },
  };

  const target = tableMap[type];
  if (!target) return c.json({ error: 'Invalid post type' }, 400);

  await c.env.DB.prepare(
    `INSERT OR IGNORE INTO ${target.table} (${target.col}, user_id) VALUES (?, ?)`,
  ).bind(postId, userId).run();

  return c.json({ message: `${type} liked successfully` });
}

export async function unlikePost(c: Context<Env>) {
  const userId = c.get('userId');
  const { postId, type } = await c.req.json();

  const tableMap: Record<string, { table: string; col: string }> = {
    Artwork: { table: 'artwork_likes', col: 'artwork_id' },
    Audio: { table: 'audio_likes', col: 'audio_id' },
    Lyrics: { table: 'lyrics_likes', col: 'lyrics_id' },
  };

  const target = tableMap[type];
  if (!target) return c.json({ error: 'Invalid post type' }, 400);

  await c.env.DB.prepare(
    `DELETE FROM ${target.table} WHERE ${target.col} = ? AND user_id = ?`,
  ).bind(postId, userId).run();

  return c.json({ message: `${type} unliked successfully` });
}
