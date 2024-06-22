import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from '../schema';

export function getDrizzleDb() {
  return drizzle(sql, { schema });
}
