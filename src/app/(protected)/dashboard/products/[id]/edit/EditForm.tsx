'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { CustomerField } from '@/domain/invoices/definitions';
import { Button } from '@/components/ui/button';
import { update } from '@/app/(protected)/dashboard/products/actions';
import React from 'react';
import { Product } from '@/domain/products';

export default function EditForm({
  product,
  customers,
  backTo,
}: {
  product: Product;
  customers: CustomerField[];
  backTo?: string;
}) {
  const initialState = { message: null, errors: {} };
  const updateWithId = update.bind(null, product.id);
  const [state, dispatch] = useFormState(updateWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                defaultValue={product.title}
                className="peer block w-full rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="mb-2 block text-sm font-medium">
            Brand
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="brand"
                name="brand"
                defaultValue={product.brand}
                className="peer block w-full rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="brand-error"
              />
            </div>
          </div>
          <div id="brand-error" aria-live="polite" aria-atomic="true">
            {state.errors?.brand &&
              state.errors.brand.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                defaultValue={product.description}
                className="peer block w-full rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
            </div>
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category"
                name="category"
                defaultValue={product.category}
                className="peer block w-full rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="category-error"
              />
            </div>
          </div>
          <div id="category-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                defaultValue={product.price}
                className="peer block w-full rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="price-error"
              />
            </div>
          </div>
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="text-xs">
          <code>
            <pre>{JSON.stringify(product._raw, null, 2)}</pre>
          </code>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button type="submit">Save</Button>
        {backTo ? (
          <Link
            href={backTo}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
        ) : null}
      </div>
    </form>
  );
}
