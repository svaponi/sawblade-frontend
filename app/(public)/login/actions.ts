'use server';

import { signIn, signOut } from '@/auth/auth';
import { revalidatePath } from 'next/cache';

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/dashboard', redirect: true });
}

export async function loginWithGithub() {
  await signIn('github', { redirectTo: '/dashboard', redirect: true });
}

export async function logout() {
  revalidatePath('/'); // invalidate cached home page
  await signOut({ redirect: true, redirectTo: '/' });
  return null
}
