import { Context } from 'hono';
import { Bindings, Variables } from '../types';

type Env = { Bindings: Bindings; Variables: Variables };

const DISABLED = { message: 'Telegram integration is not configured yet.' };

export async function shareLyrics(c: Context<Env>) { return c.json(DISABLED, 503); }
export async function sharePromo(c: Context<Env>) { return c.json(DISABLED, 503); }
export async function shareArtwork(c: Context<Env>) { return c.json(DISABLED, 503); }
export async function shareAudio(c: Context<Env>) { return c.json(DISABLED, 503); }
export async function deleteFromLog(c: Context<Env>) { return c.json(DISABLED, 503); }
export async function getLog(c: Context<Env>) { return c.json([]); }
