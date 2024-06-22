import Credentials from 'next-auth/providers/credentials';
import { User } from 'next-auth';

export type FindUserByCredentials = (
  email: string,
  password: string,
) => Promise<User | null>;

// https://authjs.dev/getting-started/providers/credentials
const CredentialsProvider = (findUserByCredentials: FindUserByCredentials) =>
  Credentials({
    credentials: {
      email: {},
      hashedPassword: {},
    },
    authorize: async (credentials, request) => {
      const { email, hashedPassword } = credentials;
      if (typeof email === 'string' && typeof hashedPassword === 'string') {
        try {
          return await findUserByCredentials(email, hashedPassword);
        } catch (e) {
          console.log('Credentials.authorize findUserByCredentials error:', e);
        }
      }
      return null;
    },
  });

export default CredentialsProvider;
