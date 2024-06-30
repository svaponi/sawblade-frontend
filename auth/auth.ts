import NextAuth from 'next-auth';
import authConfig from '@/auth/auth.config';
import CredentialsProvider from '@/auth/auth.credentials';
import { findUserByCredentials } from '@/lib/db';
import { adapter } from '@/drizzle/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  ...authConfig,
  providers: [
    ...authConfig.providers,
    CredentialsProvider(findUserByCredentials),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, account, profile, user }) {
      const role = user?.role ?? null;
      if (role) {
        token.role = role;
      } else {
        const email = token?.email ?? profile?.email ?? user?.email ?? null;
        if (email && adapter.getUserByEmail) {
          const appUser = await adapter.getUserByEmail(email);
          console.log('adapter.getUserByEmail', appUser);
          token.role = appUser?.role;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.role = (token?.role ?? user?.role ?? null) as string | null;
      return session;
    },
  },
});
