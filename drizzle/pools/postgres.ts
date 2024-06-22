import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

export function getDrizzleDb() {
  const connectionString = process.env.POSTGRES_URL!;
  if (!connectionString) throw new Error('Missing POSTGRES_URL');
  const pool = postgres(connectionString, { max: 1 });
  return drizzle(pool);
}
