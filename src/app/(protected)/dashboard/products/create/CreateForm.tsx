'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { CustomerField } from '@/domain/invoices/definitions';
import { Button } from '@/components/ui/button';
import { create } from '@/app/(protected)/dashboard/products/actions';
import { Input } from '@/components/ui/input';

export default function CreateForm({
  customers,
  backTo,
}: {
  customers: CustomerField[];
  backTo?: string;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-4">
        <div className="">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="">
            <Input id="title" name="title" aria-describedby="title-error" />
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="">
          <label htmlFor="brand" className="mb-2 block text-sm font-medium">
            Brand
          </label>
          <div className="">
            <Input
              id="brand"
              name="brand"
              className="peer block w-full rounded-md border px-4 py-2 text-sm outline-2"
              aria-describedby="brand-error"
            />
          </div>
          <div id="brand-error" aria-live="polite" aria-atomic="true">
            {state.errors?.brand &&
              state.errors.brand.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <div className="">
            <Input
              id="description"
              name="description"
              aria-describedby="description-error"
            />
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category
          </label>
          <div className="">
            <Input
              id="category"
              name="category"
              aria-describedby="category-error"
            />
          </div>
          <div id="category-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price
          </label>
          <div className="">
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              aria-describedby="price-error"
            />
          </div>
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-destructive">{state.message}</p>
          ) : null}
        </div>

        <div className="flex gap-4">
          <Button type="submit">Save</Button>
          {backTo ? (
            <Link href={backTo}>
              <Button variant={'secondary'}>Cancel</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </form>
  );
}
