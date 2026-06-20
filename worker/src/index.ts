import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Bindings, Variables } from './types';
import { adminAuth, userAuth } from './middleware/auth';

import { login, register, logout, changePassword } from './controllers/auth';
import { createArtwork, deleteArtwork, getArtworks, getArtworkById, updateArtwork } from './controllers/artwork';
import { createAudio, deleteAudio, updateAudio, getAllAudio, getAudioById } from './controllers/audio';
import { createLyric, getAllLyrics, getLyricById, updateLyricById, deleteLyricById } from './controllers/lyrics';
import { createCategory, getCategories, getCategoriesByType, updateCategory, deleteCategory, getProductsByCategory } from './controllers/category';
import { getAllPromoCodes, createPromoCode, deletePromoCode, updatePromoCode, checkPromoCode } from './controllers/promo';
import { likePost, unlikePost } from './controllers/user';
import { addPayment, getPurchaseHistory, getPayments } from './controllers/payment';
import { shareLyrics, sharePromo, shareArtwork, shareAudio, deleteFromLog, getLog } from './controllers/telegram';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use('*', cors({
  origin: (origin) => origin,
  allowHeaders: ['Content-Type', 'Cookie'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Auth
app.post('/api/auth/login', login);
app.post('/api/auth/register', register);
app.get('/api/auth/logout', logout);
app.post('/api/auth/changePassword', userAuth, changePassword);

// Shop (public)
app.get('/api/shop/categories', getCategories);
app.get('/api/shop/getProducts/:type/:title', getProductsByCategory);
app.get('/api/shop/artwork', getArtworks);
app.get('/api/shop/artwork/:id', getArtworkById);
app.get('/api/shop/audio', getAllAudio);
app.get('/api/shop/audio/:id', getAudioById);
app.get('/api/shop/lyrics', getAllLyrics);
app.get('/api/shop/lyric/:id', getLyricById);
app.post('/api/shop/newTotal', checkPromoCode);

// User interactions (protected: user role)
app.put('/api/user/Interactions/like', userAuth, likePost);
app.put('/api/user/Interactions/unlike', userAuth, unlikePost);
app.post('/api/user/Payment', userAuth, addPayment);
app.get('/api/user/Payment/History', userAuth, getPurchaseHistory);

// Admin — Artwork
app.get('/api/admin/Artwork', adminAuth, getArtworks);
app.post('/api/admin/Artwork', adminAuth, createArtwork);
app.delete('/api/admin/Artwork/:id', adminAuth, deleteArtwork);
app.patch('/api/admin/Artwork/:id', adminAuth, updateArtwork);

// Admin — Audio
app.get('/api/admin/Audio', adminAuth, getAllAudio);
app.post('/api/admin/Audio', adminAuth, createAudio);
app.delete('/api/admin/Audio/:id', adminAuth, deleteAudio);
app.patch('/api/admin/Audio/:id', adminAuth, updateAudio);

// Admin — Lyrics
app.get('/api/admin/Lyrics', adminAuth, getAllLyrics);
app.post('/api/admin/Lyrics', adminAuth, createLyric);
app.get('/api/admin/Lyrics/:id', adminAuth, getLyricById);
app.patch('/api/admin/Lyrics/:id', adminAuth, updateLyricById);
app.delete('/api/admin/Lyrics/:id', adminAuth, deleteLyricById);

// Admin — Category
app.get('/api/admin/Category', adminAuth, getCategories);
app.get('/api/admin/Category/type/:type', adminAuth, getCategoriesByType);
app.post('/api/admin/Category', adminAuth, createCategory);
app.patch('/api/admin/Category/:id', adminAuth, updateCategory);
app.delete('/api/admin/Category/:id', adminAuth, deleteCategory);

// Admin — Promo
app.get('/api/admin/Promo', adminAuth, getAllPromoCodes);
app.post('/api/admin/Promo', adminAuth, createPromoCode);
app.delete('/api/admin/Promo/:id', adminAuth, deletePromoCode);
app.patch('/api/admin/Promo/:id', adminAuth, updatePromoCode);

// Admin — Accounting
app.get('/api/admin/Accounting', adminAuth, getPayments);

// Admin — Telegram
app.post('/api/admin/Telegram/Lyrics/:id', adminAuth, shareLyrics);
app.post('/api/admin/Telegram/Promo/:id', adminAuth, sharePromo);
app.post('/api/admin/Telegram/Artwork/:id', adminAuth, shareArtwork);
app.post('/api/admin/Telegram/Audio/:id', adminAuth, shareAudio);
app.delete('/api/admin/Telegram/:id', adminAuth, deleteFromLog);
app.get('/api/admin/Telegram', adminAuth, getLog);

// R2 asset serving — fetch files by key
app.get('/assets/*', async (c) => {
  const key = c.req.path.replace('/assets/', '');
  const object = await c.env.R2.get(key);
  if (!object) return c.notFound();

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000');

  return new Response(object.body, { headers });
});

export default app;
