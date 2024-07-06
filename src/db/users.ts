import { and, count, ilike, or, SQL } from 'drizzle-orm';
import { users } from '@/db/drizzle/schema';
import { db } from '@/db/drizzle';
import { toUserRole, UserRole } from '@/auth/model';
import { WithId } from '@/db/index';

type UserSelect = typeof users.$inferSelect;
type UserInsert = typeof users.$inferInsert;

export interface AppUser extends WithId<string> {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole | null;
}

function toAppUser(dbUser: UserSelect): AppUser {
  return {
    id: dbUser.id,
    name: dbUser.name ?? dbUser.email.split('@')[0],
    email: dbUser.email,
    image: dbUser.image,
    role: toUserRole(dbUser.role),
  };
}

export interface OffsetResult<T> {
  data: T[];
  nextOffset: number;
  total?: number;
}

export async function findUsers(
  query: string | null | undefined,
  offset: number,
  limit: number,
  includeTotal: boolean = false,
): Promise<OffsetResult<AppUser>> {
  console.log(query, offset, limit, includeTotal);
  let conditions: (SQL | undefined)[] = [];
  if (query) {
    conditions.push(
      or(ilike(users.email, `%${query}%`), ilike(users.name, `%${query}%`)),
    );
  }
  const data = await db
    .select()
    .from(users)
    .where(and(...conditions))
    .offset(offset)
    .limit(limit);
  const nextOffset = offset + data.length;
  if (!includeTotal) {
    return { data: data.map(toAppUser), nextOffset };
  }
  const countData = await db
    .select({ count: count() })
    .from(users)
    .where(and(...conditions));
  const total = countData[0].count;
  return { data: data.map(toAppUser), total, nextOffset };
}

export async function countUsers(): Promise<number> {
  const countData = await db.select({ count: count() }).from(users);
  const total = countData[0].count;
  return total;
}
