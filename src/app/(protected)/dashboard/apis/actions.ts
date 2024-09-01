'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Api, apis } from '@/domain/openauth/api';
import { LIST_PAGE_PATH, PAGE_SIZE } from './constants';

const FormSchema = z.object({
  audience: z
    .string({
      invalid_type_error: 'Please provide an audience.',
    })
    .min(1, 'Audience cannot be empty')
    .url('Audience must be a valid URL'),
  permissions: z.array(
    z.string({
      invalid_type_error: 'Please provide a permission.',
    }),
  ),
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
    audience: formData.get('audience') as string,
    permissions: formData.getAll('permissions'),
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
    await apis.create(data);
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
    await apis.updateById(id, data);
  } catch (error) {
    return { message: 'Server Error.' };
  }

  revalidatePath(LIST_PAGE_PATH);
  redirect(LIST_PAGE_PATH);
}

export async function getPage(query?: string, page?: number): Promise<Api[]> {
  const offset = ((page ?? 1) - 1) * PAGE_SIZE;
  return await apis.search(offset, PAGE_SIZE, { query });
}

export async function getPageCount(query?: string): Promise<number> {
  const result = await apis.count({ query });
  return Math.ceil(result / PAGE_SIZE);
}

export async function getPageAndPageCount(
  query?: string,
  page?: number,
): Promise<[Api[], number]> {
  return await Promise.all([getPage(query, page), getPageCount(query)]);
}

export async function deleteById(id: string) {
  try {
    await apis.deleteById(id);
    revalidatePath(`${LIST_PAGE_PATH}/${id}`);
    revalidatePath(LIST_PAGE_PATH);
    return { message: 'Deleted' };
  } catch (error) {
    return { message: 'Database Error: Failed to delete.' };
  }
}

export async function getById(id: string) {
  return await apis.getById(id);
}
