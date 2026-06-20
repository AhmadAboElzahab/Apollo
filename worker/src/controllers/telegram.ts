import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

async function tgPost(token: string, method: string, body: object) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<any>;
}

export async function shareLyrics(c: Context<Env>) {
  const id = c.req.param('id');
  const lyric = await c.env.DB.prepare('SELECT * FROM lyrics WHERE id = ?').bind(id).first<any>();
  if (!lyric) return c.json({ message: 'Lyrics not Found' }, 400);

  const text = `A new Lyrics is Here : ${lyric.title}\n\n\n${lyric.lyrics.substring(0, 70)}.. \n\n\nwith price of:${lyric.price} \nGet it at \n${c.env.DOMAIN}store/Lyrics/${id}`;
  const data = await tgPost(c.env.TELEGRAM_TOKEN, 'sendMessage', { chat_id: c.env.TELEGRAM_CHAT_ID, text });

  if (!data.ok) return c.json({ message: 'Error sharing lyrics' }, 500);

  const logId = crypto.randomUUID();
  await c.env.DB.prepare('INSERT INTO telegram_logs (id, message_id, type, body) VALUES (?, ?, ?, ?)').bind(logId, String(data.result.message_id), 'Lyrics', text).run();
  return c.json({ message: 'Lyrics Shared Successfully' });
}

export async function sharePromo(c: Context<Env>) {
  const id = c.req.param('id');
  const promo = await c.env.DB.prepare('SELECT * FROM promo_codes WHERE id = ?').bind(id).first<any>();
  if (!promo) return c.json({ message: 'Promo not Found' }, 400);

  const text = `A New Promo Code is Added: ${promo.code}\nDon't miss ${promo.value}% discount Chance`;
  const data = await tgPost(c.env.TELEGRAM_TOKEN, 'sendMessage', { chat_id: c.env.TELEGRAM_CHAT_ID, text });

  if (!data.ok) return c.json({ message: 'Error sharing promo' }, 500);

  const logId = crypto.randomUUID();
  await c.env.DB.prepare('INSERT INTO telegram_logs (id, message_id, type, body) VALUES (?, ?, ?, ?)').bind(logId, String(data.result.message_id), 'promo', text).run();
  return c.json(data);
}

export async function shareArtwork(c: Context<Env>) {
  const id = c.req.param('id');
  const artwork = await c.env.DB.prepare('SELECT * FROM artworks WHERE id = ?').bind(id).first<any>();
  if (!artwork) return c.json({ message: 'Artwork not found' }, 400);

  const caption = `A new Artwork is Here : ${artwork.title} \nwith price of:${artwork.price} \nDescription: ${artwork.description} \nGet it at \n${c.env.DOMAIN}store/artwork/${id}`;

  // Stream image from R2 directly to Telegram
  const r2Object = await c.env.R2.get(artwork.art);
  if (!r2Object) return c.json({ message: 'Image not found in R2' }, 500);

  const imageBytes = await r2Object.arrayBuffer();
  const blob = new Blob([imageBytes], { type: r2Object.httpMetadata?.contentType ?? 'image/webp' });

  const form = new FormData();
  form.append('chat_id', c.env.TELEGRAM_CHAT_ID);
  form.append('photo', blob, 'image.webp');
  form.append('caption', caption);

  const res = await fetch(`https://api.telegram.org/bot${c.env.TELEGRAM_TOKEN}/sendPhoto`, { method: 'POST', body: form });
  const data = await res.json() as any;

  if (!data.ok) return c.json({ message: 'Artwork Could not be Shared' }, 500);

  const logId = crypto.randomUUID();
  await c.env.DB.prepare('INSERT INTO telegram_logs (id, message_id, type, body, asset) VALUES (?, ?, ?, ?, ?)').bind(logId, String(data.result.message_id), 'Artwork', caption, artwork.art).run();
  return c.json({ message: 'Artwork Shared Successfully' });
}

export async function shareAudio(c: Context<Env>) {
  const id = c.req.param('id');
  const audio = await c.env.DB.prepare('SELECT * FROM audio WHERE id = ?').bind(id).first<any>();
  if (!audio) return c.json({ message: 'Audio not found' }, 400);

  const caption = `A new Beat is Here : ${audio.title} \nwith price of:${audio.price} \nDescription: ${audio.description} \nGet it at \n${c.env.DOMAIN}store/beat/${id}`;

  const r2Object = await c.env.R2.get(audio.audio_key);
  if (!r2Object) return c.json({ message: 'Audio not found in R2' }, 500);

  const audioBytes = await r2Object.arrayBuffer();
  const blob = new Blob([audioBytes], { type: r2Object.httpMetadata?.contentType ?? 'audio/wav' });

  const form = new FormData();
  form.append('chat_id', c.env.TELEGRAM_CHAT_ID);
  form.append('audio', blob, audio.title);
  form.append('caption', caption);

  const res = await fetch(`https://api.telegram.org/bot${c.env.TELEGRAM_TOKEN}/sendAudio`, { method: 'POST', body: form });
  const data = await res.json() as any;

  if (!data.ok) return c.json({ message: 'Beat Could not be Shared' }, 500);

  const logId = crypto.randomUUID();
  await c.env.DB.prepare('INSERT INTO telegram_logs (id, message_id, type, body, asset) VALUES (?, ?, ?, ?, ?)').bind(logId, String(data.result.message_id), 'Beat', caption, audio.audio_key).run();
  return c.json({ message: 'Beat Shared Successfully' });
}

export async function deleteFromLog(c: Context<Env>) {
  const messageId = c.req.param('id');
  const log = await c.env.DB.prepare('SELECT * FROM telegram_logs WHERE message_id = ?').bind(messageId).first<any>();
  if (!log) return c.json({ message: 'Log not found' }, 404);

  const params = new URLSearchParams({ chat_id: c.env.TELEGRAM_CHAT_ID, message_id: String(messageId) });
  const res = await fetch(`https://api.telegram.org/bot${c.env.TELEGRAM_TOKEN}/deleteMessage`, { method: 'POST', body: params });

  if (!res.ok) return c.json({ success: false, message: await res.json() }, 500);

  await c.env.DB.prepare('DELETE FROM telegram_logs WHERE id = ?').bind(log.id).run();
  return c.json({ success: true, message: 'Deleted' });
}

export async function getLog(c: Context<Env>) {
  const rows = await c.env.DB.prepare('SELECT * FROM telegram_logs').all<any>();
  return c.json(rows.results.map((r: any) => ({ _id: r.id, Message_id: r.message_id, type: r.type, body: r.body, asset: r.asset })));
}
