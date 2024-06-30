import { User as OrigUser } from 'next-auth';
import { JWT as OrigJWT } from 'next-auth/jwt';
import { UserRole } from '@/auth/model';

// See https://next-auth.js.org/getting-started/typescript

declare module 'next-auth' {
  interface User extends OrigUser {
    role?: UserRole | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends OrigJWT {
    role?: UserRole | null;
  }
}
