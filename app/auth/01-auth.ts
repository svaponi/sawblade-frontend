'use server';

import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from '@/app/auth/definitions';
import { findUserByEmail, insertUser } from '@/lib/db';
import bcrypt from 'bcrypt';
import { signIn } from '@/auth/auth';

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
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
