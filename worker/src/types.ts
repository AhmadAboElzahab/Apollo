export type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
  SECRET_KEY: string;
  DOMAIN: string;
  // EMAIL, EMAIL_PASSWORD, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID — disabled, add when ready
};

export type Variables = {
  userId: string;
  userRole: string;
};
