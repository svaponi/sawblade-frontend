'use server';

import Search from '@/components/Search';
import React, { Suspense } from 'react';
import PageList from '@/components/PageList';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { LIST_PAGE_PATH, RESOURCE_NAME_PLURAL } from './constants';
import { deleteById, getPageAndPageCount } from './actions';
import { ClientAudience } from '@/domain/openauth/clientAudience';

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
            <h3>{RESOURCE_NAME_PLURAL}</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            <h3>All {RESOURCE_NAME_PLURAL} in the system.</h3>
          </div>
        </div>
        <Search placeholder="Search..." />
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
  const [data, totalPages] = await getPageAndPageCount(query, page);

  function ItemComponent({ item }: { item: ClientAudience }) {
    return (
      <Card key={item.id}>
        <CardContent className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
          <Link href={`${LIST_PAGE_PATH}/${item.id}?fromPage=${page}`}>
            <p className="">
              {item.client_id} <pre>{item.audience}</pre>
            </p>
            <p className="text-xs text-muted-foreground">{item.id}</p>
          </Link>
          <div className="flex items-center gap-4">
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
    <Link href={`${LIST_PAGE_PATH}/create`}>
      <Button>
        <PlusIcon className="h-5" />
        <span className="ml-2">Create</span>
      </Button>
    </Link>
  );
}

function DeleteButton({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteById.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <Button variant={'outline'}>
        <TrashIcon className="w-5" />
        <span className="sr-only">Delete</span>
      </Button>
    </form>
  );
}
