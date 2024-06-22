import { and, eq } from 'drizzle-orm';
import { users } from '@/drizzle/schema';
import { User } from 'next-auth';
import { db } from '@/drizzle/db';

type UserSelect = typeof users.$inferSelect;
type UserInsert = typeof users.$inferInsert;

export interface NewUser {
  name: string;
  email: string;
  hashedPassword: string;
}

export interface AppUser extends User {
  id: string;
  name: string;
  email: string;
}

export async function insertUser(user: NewUser): Promise<User> {
  const values: UserInsert = { ...user };
  const data = await db.insert(users).values(values).returning();
  return toUser(data[0]);
}

export async function findUserByEmail(email: string): Promise<AppUser | null> {
  const data = await db.select().from(users).where(eq(users.email, email));
  return data.length ? toUser(data[0]) : null;
}

export async function findUserByCredentials(
  email: string,
  hashedPassword: string,
): Promise<AppUser | null> {
  const data = await db
    .select()
    .from(users)
    .where(
      and(eq(users.email, email), eq(users.hashedPassword, hashedPassword)),
    );
  return data.length ? toUser(data[0]) : null;
}

function toUser(dbUser: UserSelect): AppUser {
  return {
    id: dbUser.id,
    name: dbUser.name ?? dbUser.email.split('@')[0],
    email: dbUser.email,
    image: dbUser.image,
  };
}
