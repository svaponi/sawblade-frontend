import { getDrizzleDb } from '@/drizzle/pools/vercel';
import { Adapter } from 'next-auth/adapters';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from '@/drizzle/schema';

export const db = getDrizzleDb();

export const adapter: Adapter = DrizzleAdapter(db, {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
  verificationTokensTable: verificationTokens,
});
