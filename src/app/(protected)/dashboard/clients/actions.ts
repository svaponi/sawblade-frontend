'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Client, clients } from '@/domain/openauth/client';
import { LIST_PAGE_PATH, PAGE_SIZE } from './constants';

const FormSchema = z.object({
  client_id: z
    .string({
      invalid_type_error: 'Please provide a client_id.',
    })
    .min(1, 'Audience cannot be empty'),
  client_secret: z
    .string({
      invalid_type_error: 'Please provide a client_secret.',
    })
    .min(1, 'Audience cannot be empty'),
});

const CreateFormSchema = FormSchema.omit({});
const UpdateFormSchema = FormSchema.omit({});

type CreateFormSchemaType = z.infer<typeof CreateFormSchema>;
type UpdateFormSchemaType = z.infer<typeof UpdateFormSchema>;

export type CreateFormState = {
  errors?: {
    [K in keyof CreateFormSchemaType]?: string[];
  };
  message?: string | null;
};

export type UpdateFormState = {
  errors?: {
    [K in keyof UpdateFormSchemaType]?: string[];
  };
  message?: string | null;
};

function formDataToObject(formData: FormData) {
  return {
    client_id: formData.get('client_id') as string,
    client_secret: formData.get('client_secret') as string,
  };
}

export async function create(
  prevState: CreateFormState,
  formData: FormData,
): Promise<CreateFormState> {
  // Validate form fields using Zod
  const validatedFields = CreateFormSchema.safeParse(
    formDataToObject(formData),
  );

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    };
  }

  // Prepare data for insertion into the database
  const data = { ...validatedFields.data };

  // Insert data into the database
  try {
    await clients.create(data);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Server Error.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(LIST_PAGE_PATH);
  redirect(LIST_PAGE_PATH);
}

export async function update(
  id: string,
  prevState: UpdateFormState,
  formData: FormData,
): Promise<UpdateFormState> {
  const validatedFields = UpdateFormSchema.safeParse(
    formDataToObject(formData),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    };
  }

  const data = { ...validatedFields.data };

  try {
    await clients.updateById(id, data);
  } catch (error) {
    return { message: 'Server Error.' };
  }

  revalidatePath(LIST_PAGE_PATH);
  redirect(LIST_PAGE_PATH);
}

export async function getPage(
  query?: string,
  page?: number,
): Promise<Client[]> {
  const offset = ((page ?? 1) - 1) * PAGE_SIZE;
  return await clients.search(offset, PAGE_SIZE, { query });
}

export async function getPageCount(query?: string): Promise<number> {
  const result = await clients.count({ query });
  return Math.ceil(result / PAGE_SIZE);
}

export async function getPageAndPageCount(
  query?: string,
  page?: number,
): Promise<[Client[], number]> {
  return await Promise.all([getPage(query, page), getPageCount(query)]);
}

export async function deleteById(id: string) {
  try {
    await clients.deleteById(id);
    revalidatePath(`${LIST_PAGE_PATH}/${id}`);
    revalidatePath(LIST_PAGE_PATH);
    return { message: 'Deleted' };
  } catch (error) {
    return { message: 'Database Error: Failed to delete.' };
  }
}

export async function getById(id: string) {
  return await clients.getById(id);
}
