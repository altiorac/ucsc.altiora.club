import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const databaseUrl = process.env.DB_URL;
const databaseAuthToken = process.env.DB_AUTH_TOKEN;

if (!databaseUrl) {
  throw new Error('DB_URL is required to run drizzle-kit configuration.');
}

if (!databaseAuthToken) {
  throw new Error('DB_AUTH_TOKEN is required to run drizzle-kit configuration.');
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: databaseUrl,
    authToken: databaseAuthToken,
  },
});
