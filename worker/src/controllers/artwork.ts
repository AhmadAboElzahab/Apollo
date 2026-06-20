import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

function newId(): string {
  return crypto.randomUUID();
}

// Encode a raw RGBA buffer into a blurhash string (pure JS, no native deps)
async function encodeBlurHash(buffer: Uint8Array, width: number, height: number): Promise<string> {
  // Simplified blurhash — we use a 4x4 DCT grid
  const compX = 4, compY = 4;
  const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~';

  function linearize(v: number): number {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }

  function encode83(v: number, len: number): string {
    let result = '';
    for (let i = 1; i <= len; i++) {
      result += CHARS[Math.floor(v / Math.pow(83, len - i)) % 83];
    }
    return result;
  }

  function sRGBToLinear(pixel: number[]): number[] {
    return [linearize(pixel[0]), linearize(pixel[1]), linearize(pixel[2])];
  }

  const components: number[][] = [];
  for (let j = 0; j < compY; j++) {
    for (let i = 0; i < compX; i++) {
      const norm = i === 0 && j === 0 ? 1 : 2;
      let r = 0, g = 0, b = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const basis = norm * Math.cos((Math.PI * i * x) / width) * Math.cos((Math.PI * j * y) / height);
          const linear = sRGBToLinear([buffer[idx], buffer[idx + 1], buffer[idx + 2]]);
          r += basis * linear[0];
          g += basis * linear[1];
          b += basis * linear[2];
        }
      }
      const scale = 1 / (width * height);
      components.push([r * scale, g * scale, b * scale]);
    }
  }

  const dc = components[0];
  const ac = components.slice(1);

  function encodeDC(r: number, g: number, b: number): number {
    return (linearToSRGB(r) << 16) | (linearToSRGB(g) << 8) | linearToSRGB(b);
  }

  function linearToSRGB(v: number): number {
    const s = Math.max(0, Math.min(1, v));
    return s <= 0.0031308 ? Math.round(s * 12.92 * 255 + 0.5) : Math.round((1.055 * Math.pow(s, 1 / 2.4) - 0.055) * 255 + 0.5);
  }

  function encodeAC(r: number, g: number, b: number, maxVal: number): number {
    return (
      Math.max(0, Math.min(18, Math.floor(signPow(r / maxVal, 0.5) * 9 + 9.5))) * 19 * 19 +
      Math.max(0, Math.min(18, Math.floor(signPow(g / maxVal, 0.5) * 9 + 9.5))) * 19 +
      Math.max(0, Math.min(18, Math.floor(signPow(b / maxVal, 0.5) * 9 + 9.5)))
    );
  }

  function signPow(v: number, exp: number): number {
    return Math.sign(v) * Math.pow(Math.abs(v), exp);
  }

  let maxAC = 0;
  if (ac.length > 0) {
    ac.forEach(([r, g, b]) => {
      maxAC = Math.max(maxAC, Math.abs(r), Math.abs(g), Math.abs(b));
    });
  }

  const sizeFlag = compX - 1 + (compY - 1) * 9;
  let hash = encode83(sizeFlag, 1);

  const quantMaxAC = ac.length > 0 ? Math.max(0, Math.min(82, Math.floor(maxAC * 166 - 0.5))) : 0;
  hash += encode83(quantMaxAC, 1);

  hash += encode83(encodeDC(dc[0], dc[1], dc[2]), 4);

  const maxACVal = ac.length > 0 ? (quantMaxAC + 1) / 166 : 1;
  ac.forEach(([r, g, b]) => {
    hash += encode83(encodeAC(r, g, b, maxACVal), 2);
  });

  return hash;
}

// Convert image bytes to raw RGBA at 32x32 using the Canvas API (available in Workers)
async function imageToRawRGBA(imageBytes: ArrayBuffer): Promise<{ data: Uint8Array; width: number; height: number }> {
  // @ts-ignore — ImageDecoder is available in Workers with nodejs_compat
  if (typeof ImageDecoder !== 'undefined') {
    // @ts-ignore
    const decoder = new ImageDecoder({ data: imageBytes, type: 'image/jpeg' });
    const { image } = await decoder.decode();
    // @ts-ignore — OffscreenCanvas available in Workers runtime
    const canvas = new (globalThis as any).OffscreenCanvas(32, 32);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0, 32, 32);
    const imgData = ctx.getImageData(0, 0, 32, 32);
    return { data: new Uint8Array(imgData.data.buffer), width: 32, height: 32 };
  }
  // Fallback: return a placeholder blurhash if no image decoding available
  throw new Error('ImageDecoder not available');
}

export async function createArtwork(c: Context<Env>) {
  const formData = await c.req.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const categoryId = formData.get('category') as string;
  const file = formData.get('image') as File | null;

  if (!file) return c.json({ error: 'No image provided.' }, 400);

  const arrayBuffer = await file.arrayBuffer();

  // Generate blurhash
  let blurHash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4'; // safe fallback
  try {
    const { data, width, height } = await imageToRawRGBA(arrayBuffer);
    blurHash = await encodeBlurHash(data, width, height);
  } catch {
    // keep fallback
  }

  const ext = file.name.split('.').pop() ?? 'webp';
  const key = `artworks/${crypto.randomUUID()}.${ext}`;

  await c.env.R2.put(key, arrayBuffer, {
    httpMetadata: { contentType: file.type || 'image/webp' },
  });

  const id = newId();
  await c.env.DB.prepare(
    'INSERT INTO artworks (id, title, description, category_id, art, blur_hash, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).bind(id, title, description, categoryId, key, blurHash, price).run();

  return c.json({ message: 'Uploaded', artwork: { id, title, description, price, art: key, blurHash } }, 200);
}

export async function deleteArtwork(c: Context<Env>) {
  const id = c.req.param('id');
  const artwork = await c.env.DB.prepare('SELECT * FROM artworks WHERE id = ?').bind(id).first<any>();
  if (!artwork) return c.json({ error: 'Artwork not found.' }, 404);

  await c.env.R2.delete(artwork.art);
  await c.env.DB.prepare('DELETE FROM artworks WHERE id = ?').bind(id).run();

  return c.json({ message: 'Artwork and image deleted successfully.' });
}

export async function getArtworks(c: Context<Env>) {
  const rows = await c.env.DB.prepare(`
    SELECT a.*, c.title as category_title
    FROM artworks a
    LEFT JOIN categories c ON c.id = a.category_id
  `).all<any>();

  const likes = await c.env.DB.prepare('SELECT artwork_id, user_id FROM artwork_likes').all<any>();
  const likeMap: Record<string, string[]> = {};
  likes.results.forEach((l: any) => {
    if (!likeMap[l.artwork_id]) likeMap[l.artwork_id] = [];
    likeMap[l.artwork_id].push(l.user_id);
  });

  const result = rows.results.map((a: any) => ({
    _id: a.id,
    title: a.title,
    description: a.description,
    category: a.category_title,
    price: a.price,
    art: a.art,
    blurHash: a.blur_hash,
    likes: likeMap[a.id] ?? [],
  }));

  return c.json(result);
}

export async function getArtworkById(c: Context<Env>) {
  const id = c.req.param('id');
  const artwork = await c.env.DB.prepare('SELECT * FROM artworks WHERE id = ?').bind(id).first<any>();
  if (!artwork) return c.json({ error: 'Artwork not found.' }, 404);
  return c.json({ _id: artwork.id, ...artwork });
}

export async function updateArtwork(c: Context<Env>) {
  const id = c.req.param('id');
  const { title, price, description } = await c.req.json();

  const artwork = await c.env.DB.prepare('SELECT id FROM artworks WHERE id = ?').bind(id).first();
  if (!artwork) return c.json({ error: 'Artwork not found.' }, 404);

  const fields: string[] = [];
  const values: any[] = [];
  if (title) { fields.push('title = ?'); values.push(title); }
  if (price) { fields.push('price = ?'); values.push(price); }
  if (description) { fields.push('description = ?'); values.push(description); }

  if (fields.length) {
    values.push(id);
    await c.env.DB.prepare(`UPDATE artworks SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
  }

  const updated = await c.env.DB.prepare('SELECT * FROM artworks WHERE id = ?').bind(id).first<any>();
  return c.json({ message: 'Artwork updated successfully', artwork: updated });
}
