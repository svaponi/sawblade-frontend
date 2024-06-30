import {NextAuthConfig} from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

// See https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility
const authConfig: NextAuthConfig = {
  debug: true,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, token, user }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      // console.log('session callback', { session, token, user });
      return session;
    },
    // redirect({ url, baseUrl }) {
    //   console.log('redirect callback', { url, baseUrl });
    //   return url
    // },
  },
  events: {
    signIn: async (message) => {
      // console.log('signIn event', message);
    },
    signOut: async (message) => {
      // console.log('signOut event', message);
    },
    createUser: async (message) => {
      // console.log('createUser event', message);
    },
    updateUser: async (message) => {
      // console.log('updateUser event', message);
    },
    linkAccount: async (message) => {
      // console.log('linkAccount event', message);
    },
    session: async (message) => {
      // console.log('session event', message);
    },
  },
};

export default authConfig;
