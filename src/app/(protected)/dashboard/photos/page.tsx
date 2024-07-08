import Search from '@/app/(protected)/dashboard/components/Search';
import PageList from '@/app/components/PageList';
import { Photo } from '@/db/photos';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getPhotos } from '@/app/(protected)/dashboard/photos/actions';
import React, { Suspense } from 'react';

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
            <h3>Photos</h3>
          </div>
          <div className="text-sm text-gray-500">
            <h3>All photos in the system.</h3>
          </div>
        </div>
        <Search placeholder="Search photos..." />
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SuspendedList {...props} />
        </Suspense>
      </div>
    </div>
  );
}

async function SuspendedList({ searchParams }: Props) {
  const query = searchParams?.query;
  const page = Number(searchParams?.page ?? '1');
  const result = await getPhotos(query, page);
  return <PageList result={result} ItemComponent={ItemComponent} />;
}

function ItemComponent({ item }: { item: Photo }) {
  return (
    <Card key={item.id}>
      <CardContent className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Image
            alt="Image"
            className="rounded-md object-cover"
            height="64"
            src={item.url ?? '/placeholder.svg'}
            style={{
              aspectRatio: '64/64',
              objectFit: 'cover',
            }}
            width="64"
          />
          <div className="grid flex-1 gap-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
            <p className="text-xs text-gray-400">
              ID: {item.id} / User: {item.user}
            </p>
          </div>
        </div>
        <Button size="sm">Track</Button>
      </CardContent>
    </Card>
  );
}
