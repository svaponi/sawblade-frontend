'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { clients } from '@/domain/openauth/client';
import { apis } from '@/domain/openauth/api';
import { config, formDataToObject, FormSchema, Model } from './constants';

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
    await config.repository.create(data);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Server Error.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(config.LIST_PAGE_PATH);
  redirect(config.LIST_PAGE_PATH);
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
    await config.repository.updateById(id, data);
  } catch (error) {
    return { message: 'Server Error.' };
  }

  revalidatePath(config.LIST_PAGE_PATH);
  redirect(config.LIST_PAGE_PATH);
}

export async function getPage(query?: string, page?: number): Promise<Model[]> {
  const offset = ((page ?? 1) - 1) * config.PAGE_SIZE;
  return await config.repository.search(offset, config.PAGE_SIZE, { query });
}

export async function getPageCount(query?: string): Promise<number> {
  const result = await config.repository.count({ query });
  return Math.ceil(result / config.PAGE_SIZE);
}

export async function getPageAndPageCount(
  query?: string,
  page?: number,
): Promise<[Model[], number]> {
  return await Promise.all([getPage(query, page), getPageCount(query)]);
}

export async function deleteById(id: string) {
  try {
    await config.repository.deleteById(id);
    revalidatePath(`${config.LIST_PAGE_PATH}/${id}`);
    revalidatePath(config.LIST_PAGE_PATH);
    return { message: 'Deleted' };
  } catch (error) {
    return { message: 'Database Error: Failed to delete.' };
  }
}

export async function getById(id: string) {
  return await config.repository.getById(id);
}

export async function getClients() {
  return await clients.search(0, 1_000, null);
}

export async function getApis() {
  return await apis.search(0, 1_000, null);
}
