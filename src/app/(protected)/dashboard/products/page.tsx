import Search from '@/app/(protected)/dashboard/components/Search';
import React, { Suspense } from 'react';
import {
  deleteById,
  getProductPage,
  getProductPageCount,
} from '@/app/(protected)/dashboard/products/actions';
import PageList from '@/app/components/PageList';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Product } from '@/domain/products';

interface Props {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Page(props: Props) {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between gap-10">
        <div className="">
          <div className="text-2xl font-semibold">
            <h3>Products</h3>
          </div>
          <div className="text-sm text-gray-500">
            <h3>All products in the system</h3>
          </div>
        </div>
        <Search placeholder="Search products..." />
        <CreateButton />
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading...</div>} key={JSON.stringify(props)}>
          <SuspendedList {...props} />
        </Suspense>
      </div>
    </div>
  );
}

async function SuspendedList({ searchParams }: Props) {
  const query = searchParams?.query;
  const page = Number(searchParams?.page ?? '1');
  const [data, totalPages] = await Promise.all([
    getProductPage(query, page),
    getProductPageCount(query),
  ]);

  function ItemComponent({ item }: { item: Product }) {
    return (
      <Card key={item.id}>
        <CardContent className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
          <Link href={`/dashboard/products/${item.id}/edit?fromPage=${page}`}>
            <div className="flex items-center gap-4">
              <Image
                alt="Image"
                className="rounded-md object-cover"
                height="64"
                src={item.thumbnail ?? '/placeholder.svg'}
                style={{
                  aspectRatio: '64/64',
                  objectFit: 'cover',
                }}
                width="64"
              />
              <div className="grid flex-1 gap-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-xs text-gray-400">{item.id}</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <p className="text-xl">{formatCurrency(item.price)}</p>
            <UpdateButton id={item.id} />
            <DeleteButton id={item.id} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <PageList result={{ data, totalPages }} ItemComponent={ItemComponent} />
  );
}

function CreateButton() {
  return (
    <Link href="/dashboard/products/create">
      <Button>
        <PlusIcon className="h-5" />
        <span className="ml-2">Create</span>
      </Button>
    </Link>
  );
}

function UpdateButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

function DeleteButton({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteById.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

function formatCurrency(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
