export type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
  SECRET_KEY: string;
  EMAIL: string;
  EMAIL_PASSWORD: string;
  TELEGRAM_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  DOMAIN: string;
};

export type Variables = {
  userId: string;
  userRole: string;
};
