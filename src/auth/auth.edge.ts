import NextAuth from 'next-auth';
import authConfig from '@/auth/auth.config';

// NOTE: If you want to use store the user session in database, you need to DB library compatible with Edge runtime.
// In our case, @vercel/postgres is compatible with Edge runtime.
// To enable it, change session.strategy to database and add the adapter to NextAuth.

// See https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility
// Also see https://next-auth.js.org/configuration/options#session

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: DrizzleAdapter(db),
  ...authConfig,
});
