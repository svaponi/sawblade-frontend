'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CategoryCount, Product, products } from '@/domain/products';

const FormSchema = z.object({
  title: z.string({
    invalid_type_error: 'Please provide a name.',
  }),
  brand: z.string({
    invalid_type_error: 'Please provide a brand.',
  }),
  description: z.string({
    invalid_type_error: 'Please provide a description.',
  }),
  category: z.string({
    invalid_type_error: 'Please provide a category.',
  }),
  price: z.coerce.number({
    invalid_type_error: 'Please provide a price.',
  }),
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
  const obj: any = {};
  formData.forEach((value, key) => {
    // If the key already exists, convert the value to an array and append the new value
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  });
  return obj;
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
  const { title, description, category, brand, price } = validatedFields.data;
  const data = { title, description, category, brand, price };

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
  revalidatePath('/dashboard/index');
  redirect('/dashboard/products');
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

  const { title, description, category, brand, price } = validatedFields.data;
  const data = { title, description, category, brand, price };

  try {
    await products.updateById(id, data);
  } catch (error) {
    return { message: 'Server Error.' };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteById(id: string) {
  try {
    await products.deleteById(id);
    revalidatePath('/dashboard/index');
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
  const offset = ((page ?? 1) - 1) * PAGE_SIZE;
  const results = await products.search(offset, PAGE_SIZE, { query });
  console.log('getProductPage', query, page, results);
  return results;
}

export async function getProductCount(query?: string): Promise<number> {
  const result = await products.count({ query });
  console.log('getProductCount', query, result);
  return result;
}

export async function getProductPageCount(query?: string): Promise<number> {
  const result = await getProductCount(query);
  return Math.ceil(result / PAGE_SIZE);
}

export async function getById(id: string) {
  return await products.getById(id);
}

export async function aggregateCategories(): Promise<CategoryCount[]> {
  return await products.aggregateCategories();
}

export async function getProductCategories(): Promise<string[]> {
  return await products.distinctCategories();
}

export async function getProductBrands(): Promise<string[]> {
  return await products.distinctBrands();
}
