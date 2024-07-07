'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Product } from '@/domain/products/model';
import { products } from '@/db/products';

const FormSchema = z.object({
  id: z.string({
    required_error: 'Missing ID',
  }),
  createdAt: z.date({
    required_error: 'Missing createdAt',
  }),
  updatedAt: z.date({
    required_error: 'Missing updatedAt',
  }),
  title: z.string({
    invalid_type_error: 'Please provide a title.',
  }),
  description: z.string({
    invalid_type_error: 'Please provide a description.',
  }),
});

const CreateFormSchema = FormSchema.omit({ id: true, createdAt: true });
const UpdateFormSchema = FormSchema.omit({ createdAt: true });

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
  const validatedFields = CreateFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    };
  }

  // Prepare data for insertion into the database
  const { title, description } = validatedFields.data;
  const createdAt = new Date().toISOString().split('T')[0];
  const data = { title, description, createdAt };

  // Insert data into the database
  try {
    await products.create(data);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Server Error.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function update(
  id: string,
  prevState: UpdateFormState,
  formData: FormData,
): Promise<UpdateFormState> {
  const validatedFields = UpdateFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    };
  }

  const { title, description } = validatedFields.data;
  const updatedAt = new Date().toISOString();
  const data = { title, description, updatedAt };

  try {
    await products.updateById(id, data);
  } catch (error) {
    return { message: 'Server Error.' };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteInvoice(id: string) {
  try {
    await products.deleteById(id);
    revalidatePath('/dashboard/products');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

const PAGE_SIZE = 5;

export async function getProductPage(
  query?: string,
  page?: number,
): Promise<Product[]> {
  const offset = (page ?? 1) * PAGE_SIZE;
  const data = await products.search(offset, PAGE_SIZE, { query });
  const results = data.map((product) => ({
    id: product._id.toString(),
    title: product.title.toString(),
    description: product.description.toString(),
  }));
  console.log('getProductPage', query, results);
  return results;
}

export async function getProductCount(query?: string): Promise<number> {
  return await products.count({ query });
}
