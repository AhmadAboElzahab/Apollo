-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  avatar TEXT
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  UNIQUE(title, type)
);

-- Artworks
CREATE TABLE IF NOT EXISTS artworks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL,
  art TEXT NOT NULL,
  blur_hash TEXT NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Artwork likes
CREATE TABLE IF NOT EXISTS artwork_likes (
  artwork_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  PRIMARY KEY (artwork_id, user_id)
);

-- Audio (Beats)
CREATE TABLE IF NOT EXISTS audio (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL,
  audio_key TEXT NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Audio likes
CREATE TABLE IF NOT EXISTS audio_likes (
  audio_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  PRIMARY KEY (audio_id, user_id)
);

-- Lyrics
CREATE TABLE IF NOT EXISTS lyrics (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  lyrics TEXT NOT NULL,
  category_id TEXT NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Lyrics likes
CREATE TABLE IF NOT EXISTS lyrics_likes (
  lyrics_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  PRIMARY KEY (lyrics_id, user_id)
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  payment_id TEXT UNIQUE NOT NULL,
  buyer_id TEXT NOT NULL,
  total_price REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- Payment products (line items)
CREATE TABLE IF NOT EXISTS payment_products (
  id TEXT PRIMARY KEY,
  payment_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  type TEXT NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payments(id)
);

-- Promo codes
CREATE TABLE IF NOT EXISTS promo_codes (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  value REAL NOT NULL
);

-- Telegram logs
CREATE TABLE IF NOT EXISTS telegram_logs (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  type TEXT NOT NULL,
  body TEXT NOT NULL,
  asset TEXT
);
