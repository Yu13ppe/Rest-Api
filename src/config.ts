export const PORT = parseInt(process.env.PORT) || 3000;

export const DB_HOST = process.env.DB_PORT || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT) || 54320;
export const DB_USER = process.env.DB_PORT || 'root';
export const DB_PASSWORD = process.env.DB_PORT || 'root';
export const DB_NAME = process.env.DB_PORT || 'RestApiDB';
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgres://default:rl3u0RkoTtvS@ep-orange-bar-a4ustilo-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require';
