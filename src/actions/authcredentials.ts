'use server';

import { findUserByEmail, insertUser } from '@/lib/db';
import bcrypt from 'bcrypt';
import { signIn } from '@/auth/auth';

import { z } from 'zod';
import { disableCredentialLogin, disableCredentialSignup } from '@/constants';

const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  if (disableCredentialSignup) {
    return { message: 'Sign up with credentials is currently disabled' };
  }

  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return {
      message: 'Email already exists, please use a different email or login.',
    };
  }
  const hashedPassword = await hashPassword(password);
  const user = await insertUser({
    name,
    email,
    hashedPassword,
  });
  if (!user) {
    return {
      message: 'An error occurred. Try again later.',
    };
  }
  try {
    formData.append('hashedPassword', hashedPassword);
    await signIn('credentials', formData);
  } catch (e) {
    return { message: `${e}` };
  }
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  if (disableCredentialLogin) {
    return { message: 'Login with credentials is currently disabled' };
  }

  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const { password } = validatedFields.data;
    const hashedPassword = await hashPassword(password);
    formData.set('hashedPassword', hashedPassword);
    await signIn('credentials', formData);
  } catch (e) {
    return { message: `${e}` };
  }
}
