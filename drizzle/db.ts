import '@/drizzle/envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';
import { NewUser, User, users } from './schema';
import { eq } from 'drizzle-orm';

export const db = drizzle(sql, { schema });

export async function insertUser(user: NewUser): Promise<User> {
  const data = await db.insert(users).values(user).returning();
  return data[0];
}

export async function findUserByEmail(
    email: string,
): Promise<User | undefined> {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
}
