import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { Adapter } from 'next-auth/adapters';
import { db } from '@/drizzle/db';
import authConfig from '@/auth/auth.config';
import CredentialsProvider from '@/auth/auth.credentials';
import { findUserByCredentials } from '@/lib/db';

const adapter: Adapter = DrizzleAdapter(db);
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  ...authConfig,
  providers: [
    ...authConfig.providers,
    CredentialsProvider(findUserByCredentials),
  ],
});
